import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { jsPDF } from "jspdf";

function Certificates({ userProfileData, userPurchases }) {
  const [certificateData, setCertificateData] = useState({});

  useEffect(() => {
    setCertificateData(userPurchases[0].purchasedCourse);
  }, []);
  console.log(certificateData);
  function download() {
    const pdfDiv = document.querySelector(".pdf-certificates-container");
    const doc = new jsPDF("p", "px", [664.5, 450]);

    doc.html(pdfDiv, {
      async callback(doc) {
        doc.save(`Certificate.pdf`);
      },
    });
  }
  return (
    <>
      {certificateData ? (
        <>
          <div className="pdf-certificates-container">
            <img
              className="pdf-certificate-form"
              src={require("../../Images/Certificate.png")}
              alt=""
            />
            <div className="pdf-certificate-logo">
              <img src={require("../../Images/logo copia.png")} alt="" />
            </div>
            <div className="this-certificate">
              <FormattedMessage
                id="this_certificate_presented_to"
                defaultMessage="This certificate presented to "
              />
            </div>
            <div className="certificate-for">
              {userProfileData.firstName} {userProfileData.lastName}
            </div>
            <div className="certificate-course-name">
              {" "}
              <FormattedMessage
                id="for_successfully_completing"
                defaultMessage="for successfully completing"
              />{" "}
              {certificateData.courseName}{" "}
              <FormattedMessage id="course" defaultMessage="course" />
            </div>
            <div className="course-date">
              {certificateData.dateOfStart
                ? certificateData.dateOfStart.slice(0, 10)
                : ""}
            </div>
            <div className="signature">
              <img src={require("../../Images/signature3.png")} alt="" />
            </div>
          </div>
          <div className="pdf-purchase-btn">
            <button onClick={download}>
              {" "}
              <FormattedMessage id="download" defaultMessage="Download" />{" "}
            </button>
          </div>
        </>
      ) : (
        <div className="no-certificate"></div>
      )}
    </>
  );
}

export default Certificates;
