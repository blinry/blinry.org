{
  inputs.nanoc-setup.url = "github:blinry/nanoc-setup";

  outputs = { nanoc-setup, ... }: {
    inherit (nanoc-setup) devShells;
  };
}
