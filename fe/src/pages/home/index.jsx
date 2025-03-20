import TopBar from "../../components/topbar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SliceMain from "./slicemain";
import ProductSection from "./productsection";

const Home = () => {
  return (
    <div className="homepage-bg1">
      <TopBar />
      <Header />
      <SliceMain />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default Home;
