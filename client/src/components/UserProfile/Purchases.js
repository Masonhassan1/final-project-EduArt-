import { Image } from "cloudinary-react";
import baseURL from "../../util/constants";
import "./UserProfile.css";

function Purchases({ imageData, userPurchases }) {
  const userProfileColor = localStorage.getItem("color");

  return (
    <section className="personal-data">
      <div id="user-bc" style={{ backgroundColor: userProfileColor }}></div>
      <div className="user-photo">
        {localStorage.getItem("imgId") ? (
          <Image
            className="user-upload-image"
            cloudName="dqukw0qgs"
            publicId={imageData || localStorage.getItem("imgId")}
          />
        ) : (
          <i
            className="fa-solid fa-user"
            style={{ color: userProfileColor }}
          ></i>
        )}
      </div>
      <div className="purchases-container">
        <div className="purchase-container">
          {userPurchases.length !== 0 ? (
            userPurchases.map((el) => {
              return (
                <div
                  className="my-purchase"
                  key={el._id}
                  style={{ backgroundColor: userProfileColor }}
                >
                  <div className="purchase-invoiceNumber">
                    invoiceNumber: {el.invoiceNumber}
                  </div>
                  <div className="purchase-course-name">
                    Course name: {el.purchasedCourse.courseName}
                  </div>
                  <div className="course-dateOfStart">
                    Course start: {el.purchasedCourse.dateOfStart.slice(0, 10)}
                  </div>
                  <div className="purchase-course-price">
                    Course price: {el.purchasedCourse.coursePrice}€
                  </div>
                  <a
                    href={`http://localhost:4000/${el.renderedPDF.slice(9)}`}
                    className="pdf-symbol"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-solid fa-file-pdf"></i>
                  </a>
                  <div className="purchase-course-img">
                    {
                      <img
                        src={`${baseURL}${el.purchasedCourse.courseImage}`}
                        alt=""
                      />
                    }
                  </div>
                </div>
              );
            })
          ) : (
            <div>"You have no purchases"</div>
          )}{" "}
        </div>
      </div>
    </section>
  );
}

export default Purchases;
