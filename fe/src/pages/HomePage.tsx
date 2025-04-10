import Header from "../components/Header";
import StickyHeader from "../components/StickyHeader";
import Topbar from "../components/Topbar";
import MobileHeader from "../components/mobile/MobileHeader";
import OffCanvasContainer from "../components/offcanvas/OffCanvasContainer";

const HomePage = () => {
  return (
    <div>
      {/* Topbar Section Start */}
      <Topbar />
      {/* Topbar Section End */}
      
      {/* Header Section Start */}
      <Header />
      {/* Header Section End */}
      
      {/* Sticky Header Section Start */}
      <StickyHeader />
      {/* Sticky Header Section End */}
      
      {/* Mobile Header Section Start */}
      <MobileHeader isSticky={false} />
      {/* Mobile Header Section End */}
      
      {/* Mobile Sticky Header Section Start */}
      <MobileHeader isSticky={true} />
      {/* Mobile Sticky Header Section End */}
      
      {/* Nội dung trang chính sẽ được thêm sau */}
      
      {/* OffCanvas Components */}
      <OffCanvasContainer />
    </div>
  );
};

export default HomePage;

