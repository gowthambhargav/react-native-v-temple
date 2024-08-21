

android apk build cmd
eas build -p android --profile preview

ximosay984@vasomly.com Pass:Gowtham@1234


select * from trnhdrseva


add sync btn whine the button is clicked get the all data saved in sevareceipts and update it to trnhdrseva this db in mysql









  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-size: 8px; /* Adjust font size as needed */
            }
            .container {
                position: relative;
                width: 100%;
                height: 100%;
                background-color: white;
                padding: 5px;
            }
            .header, .content, .footer {
                text-align: center;
            }
            .header h1, .content p, .footer p {
                margin: 2px 0;
            }
            .footer {
                border-bottom: 1px solid;
                border-top: 1px solid;
                padding: 5px 0;
                margin-bottom: 5px;
            }
            .footer div {
                border: 1px solid;
                display: flex;
                align-items: center;
                padding: 5px;
            }
            @media print {
                body {
                    width: 2.91in; /* A7 width */
                    height: 4.13in; /* A7 height */
                }
            }
            @media screen {
                body {
                    width: 8.27in; /* A4 width */
                    height: 11.69in; /* A4 height */
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="font-size: 14px; font-weight: bold; text-transform: uppercase;">${addressData?.CompName}</h1>
                <p style="text-transform: capitalize; width: 60%; margin: 2px auto;">
                    ${addressData?.Address1} <br> ${addressData?.Address2}<br> ${addressData?.Address3} <br>${addressData?.Address5 ? `${addressData.Address5} ` : ''}Ph: ${addressData?.MOBNO}
                </p>
            </div>
            <div class="content">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid; border-top: 1px solid; padding: 5px 0;">
                    <p>Date: <strong>${currentDate}</strong></p>
                    <p>Receipt No: <strong>${sevaDetails?.sevaReceiptID}</strong></p>
                </div>
                <div style="margin-top: 5px; padding-bottom: 5px;">
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Name:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.name}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Gothra:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.gothra}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Nakshatra:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.nakshatra}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Rashi:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.rashi}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Sannidhi:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.sannidhi}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Seva:</p>
                        <p style="padding-left: 5px; font-weight: bold; font-size: 15px; margin: 2px 0;">${sevaDetails?.seva}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Mobile:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.phoneNo}</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p style="font-size: 12px; font-weight: bold; text-align: left;">Seva Date: ${currentDate}</p>
                <div>
                    <p style="font-size: 16px; margin-left: 5px; margin-top: -4px; font-weight: bold;">₹${sevaAmount}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;





