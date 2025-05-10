import logo from '../assets/icon.png';
import React from 'react';
import githubIcon from '../assets/icons/github.png';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vitalis Logo" className="w-6 h-6 rounded-full border border-green-500" />
              <span className="font-semibold">Vitalis</span>
            </div>
            <p className="text-muted-foreground">
              Smart Real-time Crop Health Monitoring, Disease Detection and Management Hub
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
               
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Integrations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Developed By</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/IceHawk11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <span className="mr-4">Ayush Mukherjee</span> 
                  <img
                    src={githubIcon}
                    alt="GitHub"
                    className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out hover:scale-110"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RealSATVIS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <span className="mr-7">Satavisha Dutta</span> 
                  <img
                   src={githubIcon}
                   alt="GitHub"
                   className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out hover:scale-110"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Y45H-GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  Yash Vardhan Choudhary
                  <img
                  src={githubIcon}
                  alt="GitHub"
                  className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out hover:scale-110"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>© 2025 Vitalis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
