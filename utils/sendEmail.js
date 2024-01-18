const nodemailer = require('nodemailer')
const dotenv=require('dotenv')


module.exports = async (email, subject, link) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: "Welcome",
            html: `<div>
                     <a href=${link}>Click here to activate your account</a>
                    </div>`,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

// module.exports = async (email,link) => {


//     const transporter = nodemailer.createTransport({
//         service:process.env.SERVICE,
//         host: process.env.EMAIL_HOST,
//         port:  process.env.EMAIL_PORT,  //465,
//         secure: false, //true,
//         auth: {
//           // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//           user:  process.env.USER,

//           pass: process.env.PASS
//         },
//       });


//       let message = {
//         from: process.env.USER, // sender address
//         to: email, // list of receivers
//         subject:"Account verification", // Subject line
//         text:"Welcome", // plain text body
//         html: `<div>
//         <a href=${link}>Click here to activate your account</a>
//         </div>`, // html body
//       }

//       transporter.sendMail(message).then((info) => {
//         return res.status(200)
//         .json({
//             msg:"mail sent successfully",
//             info: info.messageId,
//             preview: nodemailer.getTestMessageUrl(info)
//         })
        
//       }).catch(error => {
//             return res.status(500).json({messsage:"Email not sent",error})
//       })


// }