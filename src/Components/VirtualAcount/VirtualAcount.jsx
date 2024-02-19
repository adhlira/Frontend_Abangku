import { useState, useEffect } from "react";
import BCA from "../Assets/Bank/bca.jpg";
import BNI from "../Assets/Bank/bni.jpg";
import BRI from "../Assets/Bank/bri.jpg";
import Mandiri from "../Assets/Bank/mandiri.jpg";
import InformationSect from "../InformationSect/InformationSect";
export default function VirtualAcount() {
  const [virtualAccountNumber, setVirtualAccountNumber] = useState("");
  const [countdown, setCountdown] = useState(7200);

  useEffect(() => {
    const newVirtualAccountNumber = generateRandomNumber();
    setVirtualAccountNumber(newVirtualAccountNumber);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const newVirtualAccountNumber = generateRandomNumber();
      setVirtualAccountNumber(newVirtualAccountNumber);
      setCountdown(7200);
    }
  }, [countdown]);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return String(randomNumber);
  };

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <>
      <div className="container-VA">
        <div className="container-bank">
          <img src={BCA} alt="BCA" />
          <img src={BNI} alt="BNI" />
          <img src={BRI} alt="BRI" />
          <img src={Mandiri} alt="Mandiri" />
        </div>
        <h1>
          {hours} : {minutes} : {seconds}
        </h1>
        <h1>Virtual Account Details</h1>
        <h2>{virtualAccountNumber}</h2>
      </div>
      <InformationSect />
    </>
  );
}
