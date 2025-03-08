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
      packages.${system}.default = import ./package.nix { inherit pkgs ags; };

      devShells.${system}.default = pkgs.mkShell {
        name = "astal-dev";

        buildInputs = with ags.packages.${system}; [
          (ags.packages.${system}.default.override {
            extraPackages = with ags.packages.${system}; [
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
