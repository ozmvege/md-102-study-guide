# Requires an active Connect-MgGraph session with User.ReadWrite.All and Group.ReadWrite.All.

$Domain        = "ozintune.onmicrosoft.com"
$UsageLocation = "DE"                          # <-- your two-letter country code
$Password      = "ChangeMeToAPassphrase!2026"  # <-- change this

# Administrators are NOT licensed: unlicensed admin access is enabled by default
# on tenants created after July 2021, which is what buys us 20 end-user seats.
$Admins = @(
    @{ First="Break-glass"; Last="Emergency Access"; Alias="admin-breakglass"; Dept="IT"; Groups=@() }
    @{ First="Intune";      Last="Administrator";    Alias="admin-intune";     Dept="IT"; Groups=@("GRP-ADM-INTUNE") }
    @{ First="Security";    Last="Administrator";    Alias="admin-security";   Dept="IT"; Groups=@("GRP-ADM-SECURITY") }
)

$Personas = @(
    @{ First="Adele";     Last="Vance";     Alias="adele.vance";       Dept="IT";            Groups=@("GRP-USR-IT","GRP-USR-PILOT") }
    @{ First="Alex";      Last="Wilber";    Alias="alex.wilber";       Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Megan";     Last="Bowen";     Alias="megan.bowen";       Dept="HR";            Groups=@("GRP-USR-HR") }
    @{ First="Joni";      Last="Sherman";   Alias="joni.sherman";      Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Diego";     Last="Siciliani"; Alias="diego.siciliani";   Dept="Field";         Groups=@("GRP-USR-FIELD") }
    @{ First="Lee";       Last="Gu";        Alias="lee.gu";            Dept="Manufacturing"; Groups=@("GRP-USR-MANUFACTURING") }
    @{ First="Miriam";    Last="Graham";    Alias="miriam.graham";     Dept="Executive";     Groups=@("GRP-USR-EXEC","GRP-USR-APPLE") }
    @{ First="Patti";     Last="Fernandez"; Alias="patti.fernandez";   Dept="Executive";     Groups=@("GRP-USR-EXEC") }
    @{ First="Pradeep";   Last="Gupta";     Alias="pradeep.gupta";     Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING","GRP-USR-PILOT") }
    @{ First="Johanna";   Last="Lorenz";    Alias="johanna.lorenz";    Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING") }
    @{ First="Isaiah";    Last="Langer";    Alias="isaiah.langer";     Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Nestor";    Last="Wilke";     Alias="nestor.wilke";      Dept="Operations";    Groups=@("GRP-USR-OPERATIONS","GRP-USR-BROAD") }
    @{ First="Henrietta"; Last="Mueller";   Alias="henrietta.mueller"; Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Lynne";     Last="Robbins";   Alias="lynne.robbins";     Dept="Retail";        Groups=@("GRP-USR-RETAIL","GRP-DEV-SHARED") }
    @{ First="Help Desk"; Last="Operator";  Alias="helpdesk.operator"; Dept="IT";            Groups=@("GRP-ADM-HELPDESK") }
    @{ First="Security";  Last="Operator";  Alias="security.operator"; Dept="IT";            Groups=@("GRP-ADM-SECOPS") }
    @{ First="Pilot";     Last="User 01";   Alias="pilot.user01";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Pilot";     Last="User 02";   Alias="pilot.user02";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Kiosk";     Last="Device";    Alias="kiosk.device";      Dept="Retail";        Groups=@("GRP-DEV-KIOSK") }
    @{ First="Staging";   Last="User 01";   Alias="staging.user01";    Dept="Test";          Groups=@() }
)

$profile = @{ Password = $Password; ForceChangePasswordNextSignIn = $false }
$failures = 0

function New-LabUser {
    param($Person, [bool]$Licensed)

    $upn = "$($Person.Alias)@$Domain"
    $user = $null

    # Check if user already exists
    $existingUser = Get-MgUser -Filter "userPrincipalName eq '$upn'" -ErrorAction SilentlyContinue
    if ($existingUser) {
        Write-Host "exists  $upn" -ForegroundColor DarkGray
        $user = $existingUser
    }
    else {
        # Build user parameters dynamically via splatting
        $userParams = @{
            DisplayName       = "$($Person.First) $($Person.Last)"
            GivenName         = $Person.First
            Surname           = $Person.Last
            UserPrincipalName = $upn
            MailNickname      = $Person.Alias
            UsageLocation     = $UsageLocation
            AccountEnabled    = $true
            PasswordProfile   = $profile
        }

        # Only pass Department if explicitly set
        if ($Person.Dept) {
            $userParams["Department"] = $Person.Dept
        }

        # Capture the created user object directly to avoid replication delay issues
        $user = New-MgUser @userParams -ErrorAction Stop
        Write-Host "created $upn" -ForegroundColor Green
    }

    # Assemble target group list safely
    $groups = if ($Person.Groups) { @($Person.Groups) } else { @() }
    if ($Licensed) { $groups += "GRP-LIC-M365-E5" }

    foreach ($name in $groups) {
        $group = Get-MgGroup -Filter "displayName eq '$name'" -ErrorAction SilentlyContinue
        if (-not $group) {
            throw "Group '$name' does not exist in the tenant. Please create it first."
        }

        $already = Get-MgGroupMember -GroupId $group.Id -All -ErrorAction SilentlyContinue |
                   Where-Object Id -eq $user.Id

        if (-not $already) {
            # Uses Microsoft Graph directoryObjects reference format compatible across SDK versions
            New-MgGroupMemberByRef -GroupId $group.Id `
                -BodyParameter @{"@odata.id" = "https://graph.microsoft.com/v1.0/directoryObjects/$($user.Id)"} `
                -ErrorAction Stop
            Write-Host "        + $name" -ForegroundColor DarkCyan
        }
    }
}

foreach ($p in $Admins) {
    try { New-LabUser -Person $p -Licensed $false }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

foreach ($p in $Personas) {
    try { New-LabUser -Person $p -Licensed $true }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

Write-Host ""
Write-Host "$($Personas.Count + $Admins.Count) accounts processed, $failures failures" `
    -ForegroundColor $(if ($failures -gt 0) { "Red" } else { "Green" })
if ($failures -gt 0) { exit 1 }