{
  addressable = {
    dependencies = ["public_suffix"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1ypdmpdn20hxp5vwxz3zc04r5xcwqc25qszdlg41h8ghdqbllwmw";
      type = "gem";
    };
    version = "2.8.1";
  };
  adsf = {
    dependencies = ["rack" "rackup"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1bi3szzcwb5g1iia9jzz0pjg6clvmpf3k73nx2zqi9jbxi9i74c5";
      type = "gem";
    };
    version = "1.4.7";
  };
  adsf-live = {
    dependencies = ["adsf" "em-websocket" "eventmachine" "listen" "rack-livereload"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "16i4gd7jhf9n0hmk7wwb4g38n099s13xr64kfkmasjx54kavi5bz";
      type = "gem";
    };
    version = "1.4.7";
  };
  cgi = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "18zc1z8va9j1gcv131p605wmkvn1p5958mmvvy7v45ki8c0w7qn5";
      type = "gem";
    };
    version = "0.3.6";
  };
  coffee-script = {
    dependencies = ["coffee-script-source" "execjs"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0rc7scyk7mnpfxqv5yy4y5q1hx3i7q3ahplcp4bq2g5r24g2izl2";
      type = "gem";
    };
    version = "2.4.1";
  };
  coffee-script-source = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1907v9q1zcqmmyqzhzych5l7qifgls2rlbnbhy5vzyr7i7yicaz1";
      type = "gem";
    };
    version = "1.12.2";
  };
  colored = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0b0x5jmsyi0z69bm6sij1k89z7h0laag3cb4mdn7zkl9qmxb90lx";
      type = "gem";
    };
    version = "1.2";
  };
  concurrent-ruby = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0krcwb6mn0iklajwngwsg850nk8k9b35dhmc2qkbdqvmifdi2y9q";
      type = "gem";
    };
    version = "1.2.2";
  };
  cri = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1bhsgnjav94mz5vf3305gxz1g34gm9kxvnrn1dkz530r8bpj0hr5";
      type = "gem";
    };
    version = "2.15.11";
  };
  ddmetrics = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0in0hk546q3js6qghbifjqvab6clyx5fjrwd3lcb0mk1ihmadyn2";
      type = "gem";
    };
    version = "1.0.1";
  };
  ddplugin = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "14hbvr6qjcn1i6pin8rq9kr02f98imskhrl8k53117mlfxxhl9sv";
      type = "gem";
    };
    version = "1.0.3";
  };
  diff-lcs = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0rwvjahnp7cpmracd8x732rjgnilqv2sx7d1gfrysslc3h039fa9";
      type = "gem";
    };
    version = "1.5.0";
  };
  em-websocket = {
    dependencies = ["eventmachine" "http_parser.rb"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1a66b0kjk6jx7pai9gc7i27zd0a128gy73nmas98gjz6wjyr4spm";
      type = "gem";
    };
    version = "0.5.3";
  };
  erb = {
    dependencies = ["cgi"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "16g5wm2icxk3jm7ypd05f9kixir7mrkhc96rq7g209y5vhrhvf0l";
      type = "gem";
    };
    version = "4.0.2";
  };
  eventmachine = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0wh9aqb0skz80fhfn66lbpr4f86ya2z5rx6gm5xlfhd05bj1ch4r";
      type = "gem";
    };
    version = "1.2.7";
  };
  execjs = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "121h6af4i6wr3wxvv84y53jcyw2sk71j5wsncm6wq6yqrwcrk4vd";
      type = "gem";
    };
    version = "2.8.1";
  };
  ffi = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1862ydmclzy1a0cjbvm8dz7847d9rch495ib0zb64y84d3xd4bkg";
      type = "gem";
    };
    version = "1.15.5";
  };
  hamster = {
    dependencies = ["concurrent-ruby"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1n1lsh96vnyc1pnzyd30f9prcsclmvmkdb3nm5aahnyizyiy6lar";
      type = "gem";
    };
    version = "3.0.0";
  };
  "http_parser.rb" = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1gj4fmls0mf52dlr928gaq0c0cb0m3aqa9kaa6l0ikl2zbqk42as";
      type = "gem";
    };
    version = "0.8.0";
  };
  json_schema = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0nzcnb9j7bbj3nc6izwlsxky8j4xly345qzfg5v5n6550kqfmqfn";
      type = "gem";
    };
    version = "0.21.0";
  };
  kramdown = {
    dependencies = ["rexml"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1ic14hdcqxn821dvzki99zhmcy130yhv5fqfffkcf87asv5mnbmn";
      type = "gem";
    };
    version = "2.4.0";
  };
  listen = {
    dependencies = ["rb-fsevent" "rb-inotify"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "13rgkfar8pp31z1aamxf5y7cfq88wv6rxxcwy7cmm177qq508ycn";
      type = "gem";
    };
    version = "3.8.0";
  };
  memo_wise = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "04jsccp6zp8rhavyflhxf95m6fwz2qsj1xzcbkj3hjhfx4x91pq5";
      type = "gem";
    };
    version = "1.7.0";
  };
  nanoc = {
    dependencies = ["addressable" "colored" "nanoc-checking" "nanoc-cli" "nanoc-core" "nanoc-deploying" "parallel" "tty-command" "tty-which"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "14drsj53qk3gdl9ffha7595g4say9iln7l8wqg0y53pb93ss7gjh";
      type = "gem";
    };
    version = "4.12.15";
  };
  nanoc-checking = {
    dependencies = ["nanoc-cli" "nanoc-core"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0inr8nmz3s3c96v7z6vhnrb2jycq3lhn5jk0scfxkzjbq541bccx";
      type = "gem";
    };
    version = "1.0.2";
  };
  nanoc-cli = {
    dependencies = ["cri" "diff-lcs" "nanoc-core" "zeitwerk"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0a5qlx564m8wnrhcn50bv08dicdmzp33m704j3i78ncslr2qwr7r";
      type = "gem";
    };
    version = "4.12.15";
  };
  nanoc-core = {
    dependencies = ["concurrent-ruby" "ddmetrics" "ddplugin" "hamster" "json_schema" "memo_wise" "psych" "slow_enumerator_tools" "tty-platform" "zeitwerk"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "17gk02lx2sxh9a5vdsf72s326p06gjyzyv96j95aqyd2wm2va4m4";
      type = "gem";
    };
    version = "4.12.15";
  };
  nanoc-deploying = {
    dependencies = ["nanoc-checking" "nanoc-cli" "nanoc-core"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "05s3aqdb7li97lzj5qpak8iac2nfhggv5s23wmzmgzm16c7fkcw9";
      type = "gem";
    };
    version = "1.0.2";
  };
  nanoc-live = {
    dependencies = ["adsf-live" "listen" "nanoc-cli" "nanoc-core"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0mnyibl977narr9k6n9wz3cpry03vkc5bwffnxbv34qfp873dqx7";
      type = "gem";
    };
    version = "1.0.0";
  };
  parallel = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "07vnk6bb54k4yc06xnwck7php50l09vvlw1ga8wdz0pia461zpzb";
      type = "gem";
    };
    version = "1.22.1";
  };
  pastel = {
    dependencies = ["tty-color"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0xash2gj08dfjvq4hy6l1z22s5v30fhizwgs10d6nviggpxsj7a8";
      type = "gem";
    };
    version = "0.8.0";
  };
  psych = {
    dependencies = ["stringio"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0xmq609h7j0xjr7jwayg8kmvcpp347cp0wnyq7jgpn58vk1ja17p";
      type = "gem";
    };
    version = "4.0.6";
  };
  public_suffix = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0hz0bx2qs2pwb0bwazzsah03ilpf3aai8b7lk7s35jsfzwbkjq35";
      type = "gem";
    };
    version = "5.0.1";
  };
  rack = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1kp78w4q0rzrkjdy1d3ii13rx1gnciqcry176062bzbcj8cs10s3";
      type = "gem";
    };
    version = "3.0.7";
  };
  rack-livereload = {
    dependencies = ["rack"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1slzlmvlapgp2pc7389i0zndq3nka0s6sh445vf21cxpz7vz3p5i";
      type = "gem";
    };
    version = "0.3.17";
  };
  rackup = {
    dependencies = ["rack" "webrick"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0kbcka30g681cqasw47pq93fxjscq7yvs5zf8lp3740rb158ijvf";
      type = "gem";
    };
    version = "2.1.0";
  };
  rb-fsevent = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1zmf31rnpm8553lqwibvv3kkx0v7majm1f341xbxc0bk5sbhp423";
      type = "gem";
    };
    version = "0.11.2";
  };
  rb-inotify = {
    dependencies = ["ffi"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1jm76h8f8hji38z3ggf4bzi8vps6p7sagxn3ab57qc0xyga64005";
      type = "gem";
    };
    version = "0.10.1";
  };
  rexml = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "08ximcyfjy94pm1rhcx04ny1vx2sk0x4y185gzn86yfsbzwkng53";
      type = "gem";
    };
    version = "3.2.5";
  };
  sass = {
    dependencies = ["sass-listen"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0p95lhs0jza5l7hqci1isflxakz83xkj97lkvxl919is0lwhv2w0";
      type = "gem";
    };
    version = "3.7.4";
  };
  sass-listen = {
    dependencies = ["rb-fsevent" "rb-inotify"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0xw3q46cmahkgyldid5hwyiwacp590zj2vmswlll68ryvmvcp7df";
      type = "gem";
    };
    version = "4.0.0";
  };
  slim = {
    dependencies = ["temple" "tilt"];
    groups = ["nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1rp437r8hr9kdgabb7c96yw4z2wyrajl4cxiij038y10f8i6hbn4";
      type = "gem";
    };
    version = "5.1.0";
  };
  slow_enumerator_tools = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0phfj4jxymxf344cgksqahsgy83wfrwrlr913mrsq2c33j7mj6p6";
      type = "gem";
    };
    version = "1.1.0";
  };
  stringio = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1al02vvy3df0q3jy8sblkgpf688bji84l4p4xq9gzkk469i23bis";
      type = "gem";
    };
    version = "3.0.5";
  };
  temple = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "07k5wr2ypsmsbyc9d1plhdki4xr7vvggld8r1i49iljkrpx5nbqc";
      type = "gem";
    };
    version = "0.10.0";
  };
  tilt = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "1qmhi6d9przjzhsyk9g5pq2j75c656msh6xzprqd2mxgphf23jxs";
      type = "gem";
    };
    version = "2.1.0";
  };
  tty-color = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0aik4kmhwwrmkysha7qibi2nyzb4c8kp42bd5vxnf8sf7b53g73g";
      type = "gem";
    };
    version = "0.6.0";
  };
  tty-command = {
    dependencies = ["pastel"];
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "14hi8xiahfrrnydw6g3i30lxvvz90wp4xsrlhx8mabckrcglfv0c";
      type = "gem";
    };
    version = "0.10.1";
  };
  tty-platform = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "02h58a8yg2kzybhqqrhh4lfdl9nm0i62nd9jrvwinjp802qkffg2";
      type = "gem";
    };
    version = "0.3.0";
  };
  tty-which = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "0rpljdwlfm4qgps2xvq6306w86fm057m89j4gizcji371mgha92q";
      type = "gem";
    };
    version = "0.5.0";
  };
  webrick = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "13qm7s0gr2pmfcl7dxrmq38asaza4w0i2n9my4yzs499j731wh8r";
      type = "gem";
    };
    version = "1.8.1";
  };
  zeitwerk = {
    groups = ["default" "nanoc"];
    platforms = [];
    source = {
      remotes = ["http://rubygems.org"];
      sha256 = "028ld9qmgdllxrl7d0qkl65s58wb1n3gv8yjs28g43a8b1hplxk1";
      type = "gem";
    };
    version = "2.6.7";
  };
}
