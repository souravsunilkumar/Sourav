import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          {/* <p>Terms & Conditions</p> */}
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <a 
                href={socialImg.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img src={socialImg.imgPath} alt={`${socialImg.name} social icon`} />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">

          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
