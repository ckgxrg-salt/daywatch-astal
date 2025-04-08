{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    ags = {
      url = "github:aylur/ags";
      inputs.astal.follows = "astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      nixpkgs,
      ags,
      ...
    }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };
    in
    {
      packages.${system} = rec {
        default = daywatch-astal;
        daywatch-astal = import ./package.nix { inherit pkgs ags; };
        logout = import ./logout/logout-package.nix { inherit pkgs ags; };
      };

      devShells.${system}.default = pkgs.mkShell {
        name = "astal-dev";

        buildInputs = with ags.packages.${system}; [
          (ags.packages.${system}.default.override {
            extraPackages = with ags.packages.${system}; [
              astal3
              io
              hyprland
              tray
              mpris
              wireplumber
              battery
              pkgs.libgtop
            ];
          })
          hyprland
          mpris
          battery

          pkgs.stylelint
          pkgs.nixfmt-rfc-style
          pkgs.deadnix
        ];
      };

      formatter.${system} = pkgs.nixfmt-rfc-style;
    };
}
