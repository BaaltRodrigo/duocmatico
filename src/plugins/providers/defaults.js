const base = {
  VAppBar: {
    color: "transparent",
    flat: true,

    VBtn: {
      class: "text-none elevation-0",
    },
  },

  VAutocomplete: {
    variant: "outlined",
    density: "comfortable",
  },

  VDialog: {
    width: 500,
    contentClass: "elevation-0",
    hideOverlay: true,
    // Cards inside dialogs are rounded xl, not lg and has no elevation
    VCard: {
      class: "bg-white rounded-xl elevation-0",
    },
  },

  VListItem: {
    VBtn: {
      color: "",
    },
  },

  VBtn: {
    color: "primary",
    variant: "flat",
    class: "text-none rounded-lg",
  },

  VCard: {
    variant: "outlined",
    class: "bg-white rounded-lg elevation-4",
  },

  VMenu: {
    VBtn: {
      class: "text-none elevation-0",
    },
  },

  VTextField: {
    variant: "outlined",
    density: "comfortable",
  },
};

export { base };
