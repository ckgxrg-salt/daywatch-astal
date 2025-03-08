{
  pkgs,
  ags,
}:
# Bundle the project
ags.lib.bundle {
  inherit pkgs;
  src = ./.;
  name = "daywatch-astal";
  entry = "app.ts";
  gtk4 = false;

  extraPackages = with ags.packages.${pkgs.system}; [
    astal3
    astal4
    io
    hyprland
    tray
    cava
    mpris
    wireplumber
    network
    battery
  ];
}
