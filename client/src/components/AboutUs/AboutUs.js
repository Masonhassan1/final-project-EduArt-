import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  const arrData = [
    {
      name: "Luay",
      github: "https://github.com/Luayabbas1981",
      linkedIn: "https://www.linkedin.com/in/luay-abbas-79531a24a/",
      officeLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160843.8259633896!2d6.6555251762457095!3d50.95728779588334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf259169ab2fe5%3A0x42760fc4a2a77f0!2zS8O2bG4!5e0!3m2!1sde!2sde!4v1668500314929!5m2!1sde!2sde",
    },
    {
      name: "Mercedes",
      github: "https://github.com/aboutthatmery",
      linkedIn: "https://www.linkedin.com/in/mercedes-girmanova/",
      officeLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80387.86135621568!2d11.236055697664755!3d50.97696016673861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a41ac631ed5ba9%3A0x4208ec174333640!2sWeimar!5e0!3m2!1sde!2sde!4v1668500490403!5m2!1sde!2sde",
    },
    {
      name: "Oxana",
      github: "https://github.com/OxanaDanilova",
      linkedIn: "https://www.linkedin.com/in/oxana-danilova-b082a0156/",
      officeLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80654.81800302186!2d12.808576389919756!3d50.822586184087974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a7465f01fd9de9%3A0x51ddf8280975d11c!2sChemnitz!5e0!3m2!1sde!2sde!4v1668499865739!5m2!1sde!2sde",
    },
    {
      name: "Joachim",
      github: "https://github.com/KazhimRycerz",
      linkedIn: "https://www.linkedin.com/in/joachimr/",
      officeLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78750.66044150293!2d8.239829216761498!3d51.9164748478955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba259303a94471%3A0x412fef90d24323c1!2sG%C3%BCtersloh!5e0!3m2!1sde!2sde!4v1668500569962!5m2!1sde!2sde",
    },
  ];
  return (
    <div className="about-wrapper">
      <p className="about-title">About the project </p>
      <p className="about-header">Made with love, right here in Germany</p>
      <div className="team-info-wrapper">
        {arrData.map((teammate, id) => {
          return (
            <div className="team-info-card" key={id}>
              {/* <div className="map-image"></div> */}
              <iframe
                title="office location"
                className="office-location-map"
                src={teammate.officeLocation}
                width="250"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p className="teammate-name">{teammate.name}</p>
              <a href={teammate.github} target="blank">
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                className="linkedin-icon"
                href={teammate.linkedIn}
                target="blank"
              >
                <svg
                  width="100"
                  height="25"
                  viewBox="0 0 100 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.4643 14.6428L44.9822 21.4285H40.625L35.7143 15.1965V21.4285H32.1428V3.57148H35.7143V14.0715L40.25 8.92852H44.8035L39.4643 14.6428ZM25.1785 8.57148C24.3965 8.58319 23.6291 8.78425 22.9418 9.15743C22.2545 9.53061 21.6679 10.0648 21.2322 10.7143V8.92852H17.8572V21.4285H21.4285V15.5893C21.3816 15.1654 21.4225 14.7365 21.5485 14.3291C21.6745 13.9217 21.8831 13.5447 22.1611 13.2214C22.4392 12.8981 22.7808 12.6355 23.1647 12.4499C23.5487 12.2644 23.9667 12.1598 24.3928 12.1428C26.4643 12.1428 26.7857 14.1785 26.7857 15.5893V21.4285H30.3572V14.8035C30.3572 10.875 29.0535 8.57148 25.25 8.57148H25.1785ZM57.1428 15.4643C57.1564 15.726 57.1564 15.9883 57.1428 16.25H47.7678V16.375C47.92 17.1197 48.3325 17.7857 48.9314 18.2537C49.5303 18.7217 50.2764 18.9609 51.0357 18.9285C51.6381 18.9547 52.2396 18.8591 52.8042 18.6474C53.3688 18.4357 53.8848 18.1123 54.3215 17.6965L56.6965 19.4822C55.9437 20.2504 55.0384 20.8522 54.0387 21.249C53.0391 21.6457 51.9674 21.8286 50.8928 21.7857C50.0028 21.842 49.1112 21.7066 48.278 21.3887C47.4449 21.0708 46.6896 20.5778 46.0633 19.943C45.437 19.3083 44.9543 18.5465 44.6476 17.7091C44.3409 16.8718 44.2175 15.9784 44.2857 15.0893C44.2675 14.2115 44.4301 13.3395 44.7637 12.5274C45.0972 11.7153 45.5944 10.9806 46.2244 10.3691C46.8543 9.75762 47.6034 9.28242 48.4251 8.97315C49.2467 8.66387 50.1232 8.52715 51 8.57148C54.3572 8.57148 57.1428 10.9465 57.1428 15.4643ZM53.8215 13.9285C53.8084 13.5748 53.7233 13.2275 53.5716 12.9077C53.4199 12.5879 53.2047 12.3024 52.939 12.0685C52.6734 11.8345 52.3629 11.6572 52.0265 11.5472C51.69 11.4371 51.3347 11.3968 50.9822 11.4285C49.4119 11.2588 47.9898 12.3648 47.7678 13.9285H53.8215ZM3.57148 3.57148H0V21.4285H10.7143V17.8574H3.57148V3.57148ZM67.8572 3.57148H71.4285V21.4285H68.0535V20.1785C67.625 20.7065 67.0788 21.1269 66.4586 21.406C65.8385 21.6851 65.1616 21.8151 64.4822 21.7857C63.6522 21.7644 62.8353 21.5736 62.0817 21.225C61.3281 20.8763 60.6538 20.3772 60.1002 19.7584C59.5466 19.1396 59.1254 18.4141 58.8625 17.6264C58.5996 16.8388 58.5006 16.0058 58.5715 15.1785C58.4872 14.3501 58.5762 13.5131 58.833 12.721C59.0898 11.9288 59.5086 11.1988 60.0629 10.5773C60.6172 9.95584 61.2947 9.45656 62.0525 9.11123C62.8102 8.7659 63.6316 8.58209 64.4643 8.57148C65.0845 8.54431 65.7039 8.64084 66.2864 8.85545C66.8689 9.07005 67.4029 9.39844 67.8572 9.82148V3.57148ZM68.125 15.1785C68.1812 14.7662 68.1482 14.3466 68.0285 13.948C67.9087 13.5495 67.7049 13.1813 67.4307 12.8682C67.1566 12.5551 66.8185 12.3044 66.4392 12.1331C66.06 11.9618 65.6484 11.8738 65.2322 11.875C63.5238 11.999 62.2293 13.4682 62.3215 15.1785C62.2293 16.8889 63.5238 18.3582 65.2322 18.4822C65.6484 18.4835 66.06 18.3955 66.4393 18.2241C66.8185 18.0528 67.1566 17.8021 67.4308 17.489C67.705 17.1759 67.9088 16.8076 68.0285 16.4091C68.1483 16.0105 68.1812 15.5909 68.125 15.1785ZM14.2857 3.21426C13.7114 3.2224 13.1616 3.44815 12.7473 3.84594C12.333 4.24373 12.085 4.78392 12.0535 5.35742C12.0535 6.59004 13.0529 7.58945 14.2857 7.58945C15.5186 7.58945 16.5176 6.58984 16.5176 5.35742C16.486 4.78399 16.2381 4.24388 15.8238 3.84613C15.4095 3.44839 14.8598 3.22264 14.2855 3.21445L14.2857 3.21426ZM12.5 21.4285H16.0715V8.92852H12.5V21.4285ZM100 1.78574V23.2143C100 23.6879 99.8119 24.1421 99.477 24.477C99.1421 24.8119 98.6879 25 98.2143 25H76.7857C76.3121 25 75.8579 24.8119 75.523 24.477C75.1881 24.1421 75 23.6879 75 23.2143V1.78574C75 1.31213 75.1881 0.857923 75.523 0.523032C75.8579 0.18814 76.3121 0 76.7857 0L98.2143 0C98.6879 0 99.1421 0.18814 99.477 0.523032C99.8119 0.857923 100 1.31213 100 1.78574ZM82.1428 8.92852H78.5715V21.4285H82.1428V8.92852ZM82.5893 5.35723C82.5893 4.12441 81.5898 3.125 80.3572 3.125C79.1244 3.125 78.125 4.12441 78.125 5.35723C78.125 6.58984 79.1244 7.58926 80.3572 7.58926C81.5898 7.58926 82.5893 6.58984 82.5893 5.35723ZM96.4285 14.8035C96.4285 10.875 95.125 8.57148 91.3215 8.57148C90.5274 8.57155 89.7454 8.76705 89.0447 9.14075C88.344 9.51444 87.746 10.0548 87.3035 10.7143V8.92852H83.9285V21.4285H87.5V15.5893C87.4531 15.1654 87.4939 14.7365 87.62 14.3291C87.746 13.9217 87.9546 13.5447 88.2326 13.2214C88.5107 12.8981 88.8523 12.6355 89.2362 12.4499C89.6202 12.2644 90.0382 12.1598 90.4643 12.1428C92.5357 12.1428 92.8572 14.1785 92.8572 15.5893V21.4285H96.4285V14.8035Z"
                    fill="#1572B6"
                  />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
      <section className="offices">
        <div className="office">
          <i className="fa-solid fa-location-dot"></i>
          <p className="officeName">UX/UI Design Office</p>
          <p className="officeTime">Mon-Fri 9am to 4pm</p>
          <p className="officeLocation">Weimar</p>
        </div>
        <div className="office">
          <i className="fa-solid fa-location-dot"></i>
          <p className="officeName">Frontend Office</p>
          <p className="officeTime">Mon-Fri 9am to 4pm</p>
          <p className="officeLocation">Cologne, Weimar, Chemnitz</p>
        </div>
        <div className="office">
          <i className="fa-solid fa-location-dot"></i>
          <p className="officeName">Backend Office</p>
          <p className="officeTime">Mon-Fri 9am to 4pm</p>
          <p className="officeLocation">Chemnitz, Gütersloh</p>
        </div>
        <div className="office">
          <i className="fa-solid fa-location-dot"></i>
          <p className="officeName">Showroom</p>
          <p className="officeTime">Friday 16.12.2022</p>
          <p className="officeLocation">9:30am to 12pm</p>
        </div>
      </section>
    </div>
  );
}
