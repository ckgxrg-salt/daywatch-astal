{
  pkgs,
  ags,
}:
# Bundle the project
ags.lib.bundle {
  inherit pkgs;
  src = ./.;
  name = "astal-logout";
  entry = "logout.ts";
  gtk4 = false;

  extraPackages = with ags.packages.${pkgs.system}; [
    astal3
    io
    hyprland
  ];
}
