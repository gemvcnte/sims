

const generateEmailTemplate = ({title, content, createdBy, typeOfAnnouncement,}) => {
    return(
    `<html>
        <head>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .main-wrapper {
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }

                .title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="banner-wrapper">
                    <img src="" alt="image-banner"/>
                </div>
                <main class="main-wrapper">
                    <h1 class="title">${title}</h1>
                    <p class="type">${typeOfAnnouncement}</p>
                    <div class="desc-wrapper">
                        <p class="content">${content}</p>
                    </div>
                    <p>${createdBy}</p>
                </main>
            </div>

        </body>
    </html>`
)}


module.exports = { generateEmailTemplate}