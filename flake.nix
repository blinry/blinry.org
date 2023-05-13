{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShells.default =
        let
          pkgs = nixpkgs.legacyPackages.${system};
          ruby = pkgs.ruby_3_2;
          gems = pkgs.bundlerEnv {
            name = "homepage-env";
            inherit ruby;
            gemdir = ./.;
          };
        in
        pkgs.mkShell {
          nativeBuildInputs = [ ruby ] ++ (with pkgs; [ bundix gems nodejs inkscape poppler_utils imagemagick pdf2svg ]);
        };
    }
    );
}
