import Link from 'next/link'
import { ReactElement } from 'react';
import { IoIosMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

type link = 
  {
    id : number;
    icon : ReactElement;
    social : string;
    link : string;
  } []

const Footer = () => {
  const Links : link = [
    {
      id : 1,
      icon :<IoLogoGithub/>,
      social : 'Github',
      link : 'https://github.com/senthil-developer/THREEJS-MEDIAPIPE'
    },
    {
      id : 2,
      icon :<IoLogoLinkedin/>,
      social : 'Linkedin',
      link : 'https://linkedin.com/in/senthil-k-17629824a'
    },
    {
      id : 3,
      icon :<IoIosMail/>,
      social : 'Email',
      link : 'mailto:sethildeveloper4@gmail.com'
    },
    
  ]
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex justify-evenly items-center">
          {Links.map((link) => (
            <Link href={link.link} key={link.id} target='_blank' className='flex text items-center gap-2'>
              {link.icon} {link.social}
            </Link> 
          ))}
        </div>
        <div className='text-center'>
          threejs-mediapipe@vercel.app &#169; 2024 All Rights Reserved 
        </div>
      </div>
    </>
  )
} 
export default Footer