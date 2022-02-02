export type VaultProgram = {
  version: "0.1.0";
  name: "magik";
  instructions: [
    {
      name: "init";
      accounts: [
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "synthMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "obligation";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lendingMarket";
          isMut: false;
          isSigner: false;
        },
        {
          name: "lendingProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "param";
          type: {
            defined: "InitParam";
          };
        },
        {
          name: "nonce";
          type: "publicKey";
        },
        {
          name: "obBump";
          type: "u8";
        }
      ];
    },
    {
      name: "deposit";
      accounts: [
        {
          name: "treasure";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userSynth";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "liquidate";
      accounts: [
        {
          name: "treasure";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "synthMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userSynth";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "borrow";
      accounts: [
        {
          name: "treasure";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "synthMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userSynth";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "lendingCrank";
      accounts: [
        {
          name: "vault";
          isMut: false;
          isSigner: false;
        },
        {
          name: "portProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "sourceLiquidity";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destinationCollateral";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserve";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserveLiquiditySupply";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserveCollateralMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lendingMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lendingMarketAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "transferAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "lendingAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "redeemCrank";
      accounts: [
        {
          name: "vault";
          isMut: false;
          isSigner: false;
        },
        {
          name: "portProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "sourceCollateral";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destinationLiquidity";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserve";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserveCollateralMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reserveLiquiditySupply";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lendingMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lendingMarketAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "transferAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "redeemAmount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "vault";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "payer";
            type: "publicKey";
          },
          {
            name: "mintToken";
            type: "publicKey";
          },
          {
            name: "vaultToken";
            type: "publicKey";
          },
          {
            name: "synthToken";
            type: "publicKey";
          },
          {
            name: "percent";
            type: "u64";
          },
          {
            name: "totalDeposit";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "treasure";
      type: {
        kind: "struct";
        fields: [
          {
            name: "currentDeposit";
            type: "u64";
          },
          {
            name: "currentBorrow";
            type: "u64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Bump";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultBump";
            type: "u8";
          },
          {
            name: "tokenBump";
            type: "u8";
          },
          {
            name: "mintBump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "InitParam";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: {
              defined: "Bump";
            };
          },
          {
            name: "percent";
            type: "u64";
          },
          {
            name: "initObligation";
            type: "bool";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "InitVault";
      fields: [
        {
          name: "payer";
          type: "publicKey";
          index: false;
        },
        {
          name: "mintToken";
          type: "publicKey";
          index: false;
        },
        {
          name: "vaultToken";
          type: "publicKey";
          index: false;
        },
        {
          name: "synthToken";
          type: "publicKey";
          index: false;
        },
        {
          name: "percent";
          type: "u64";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "ExceedBorrowAmount";
      msg: "Exceed Borrow Amount";
    }
  ];
};

export const VaultIdl: VaultProgram = {
  version: "0.1.0",
  name: "magik",
  instructions: [
    {
      name: "init",
      accounts: [
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "synthMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "obligation",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lendingMarket",
          isMut: false,
          isSigner: false,
        },
        {
          name: "lendingProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "param",
          type: {
            defined: "InitParam",
          },
        },
        {
          name: "nonce",
          type: "publicKey",
        },
        {
          name: "obBump",
          type: "u8",
        },
      ],
    },
    {
      name: "deposit",
      accounts: [
        {
          name: "treasure",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSynth",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "liquidate",
      accounts: [
        {
          name: "treasure",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "synthMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSynth",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "borrow",
      accounts: [
        {
          name: "treasure",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "synthMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSynth",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "lendingCrank",
      accounts: [
        {
          name: "vault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "portProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sourceLiquidity",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationCollateral",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveLiquiditySupply",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveCollateralMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lendingMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lendingMarketAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transferAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lendingAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "redeemCrank",
      accounts: [
        {
          name: "vault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "portProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sourceCollateral",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationLiquidity",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveCollateralMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveLiquiditySupply",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lendingMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lendingMarketAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transferAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "redeemAmount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "vault",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "payer",
            type: "publicKey",
          },
          {
            name: "mintToken",
            type: "publicKey",
          },
          {
            name: "vaultToken",
            type: "publicKey",
          },
          {
            name: "synthToken",
            type: "publicKey",
          },
          {
            name: "percent",
            type: "u64",
          },
          {
            name: "totalDeposit",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "treasure",
      type: {
        kind: "struct",
        fields: [
          {
            name: "currentDeposit",
            type: "u64",
          },
          {
            name: "currentBorrow",
            type: "u64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Bump",
      type: {
        kind: "struct",
        fields: [
          {
            name: "vaultBump",
            type: "u8",
          },
          {
            name: "tokenBump",
            type: "u8",
          },
          {
            name: "mintBump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "InitParam",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: {
              defined: "Bump",
            },
          },
          {
            name: "percent",
            type: "u64",
          },
          {
            name: "initObligation",
            type: "bool",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "InitVault",
      fields: [
        {
          name: "payer",
          type: "publicKey",
          index: false,
        },
        {
          name: "mintToken",
          type: "publicKey",
          index: false,
        },
        {
          name: "vaultToken",
          type: "publicKey",
          index: false,
        },
        {
          name: "synthToken",
          type: "publicKey",
          index: false,
        },
        {
          name: "percent",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ExceedBorrowAmount",
      msg: "Exceed Borrow Amount",
    },
  ],
};
