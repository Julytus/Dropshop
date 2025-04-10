export interface MenuItem {
  text: string;
  url?: string;
  children?: MenuItem[];
}

export interface MainMenuItem {
  text: string;
  url?: string;
  children?: MenuItem[];
  megaMenu?: {
    groups: {
      title: string;
      items: MenuItem[];
    }[];
  };
}

export const menuData: MainMenuItem[] = [
  {
    text: "Home",
    children: [
      { text: "Arts Propelled", url: "index.html" },
      { text: "Decor Thriving", url: "index-2.html" },
      { text: "Savvy Delight", url: "index-3.html" },
      { text: "Perfect Escapes", url: "index-4.html" }
    ]
  },
  {
    text: "Shop",
    megaMenu: {
      groups: [
        {
          title: "SHOP PAGES",
          items: [
            { text: "Shop No Sidebar", url: "shop.html" },
            { text: "Shop Left Sidebar", url: "shop-left-sidebar.html" },
            { text: "Shop Right Sidebar", url: "shop-right-sidebar.html" },
            { text: "Shop Fullwidth No Space", url: "shop-fullwidth-no-gutters.html" },
            { text: "Shop Fullwidth No Sidebar", url: "shop-fullwidth.html" },
            { text: "Shop Fullwidth Left Sidebar", url: "shop-fullwidth-left-sidebar.html" },
            { text: "Shop Fullwidth Right Sidebar", url: "shop-fullwidth-right-sidebar.html" }
          ]
        },
        {
          title: "PRODUCT PAGES",
          items: [
            { text: "Basic", url: "product-details.html" },
            { text: "Fullwidth", url: "product-details-fullwidth.html" },
            { text: "Sticky Details", url: "product-details-sticky.html" },
            { text: "Width Sidebar", url: "product-details-sidebar.html" },
            { text: "Extra Content", url: "product-details-extra-content.html" },
            { text: "Variations Images", url: "product-details-image-variation.html" },
            { text: "Bought Together", url: "product-details-group.html" },
            { text: "Product 360", url: "product-details-360.html" }
          ]
        }
      ]
    }
  },
  {
    text: "Project",
    children: [
      { text: "Portfolio 3 Columns", url: "portfolio-3-columns.html" },
      { text: "Portfolio 4 Columns", url: "portfolio-4-columns.html" },
      { text: "Portfolio 5 Columns", url: "portfolio-5-columns.html" },
      { text: "Portfolio Details", url: "portfolio-details.html" }
    ]
  },
  {
    text: "Pages",
    children: [
      { text: "About us", url: "about-us.html" },
      { text: "About us 02", url: "about-us-2.html" },
      { text: "Contact us", url: "contact-us.html" },
      { text: "Coming Soon", url: "coming-soon.html" },
      { text: "Page 404", url: "404.html" }
    ]
  },
  {
    text: "Blog",
    children: [
      {
        text: "Standard Layout",
        children: [
          { text: "Right Sidebar", url: "blog-right-sidebar.html" },
          { text: "Left Sidebar", url: "blog-left-sidebar.html" },
          { text: "Full Width", url: "blog-fullwidth.html" }
        ]
      },
      {
        text: "Grid Layout",
        children: [
          { text: "Right Sidebar", url: "blog-grid-right-sidebar.html" },
          { text: "Left Sidebar", url: "blog-grid-left-sidebar.html" },
          { text: "Full Width", url: "blog-grid-fullwidth.html" }
        ]
      }
    ]
  }
]; 