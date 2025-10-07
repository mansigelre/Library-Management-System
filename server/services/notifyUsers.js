import cron from 'node-cron';
import { User } from "../models/userModel.js";
import Borrow from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";
// node cron scheduling ke kaam aata hai like jese iss file me hum bhejre hai message ki aapke itna time rehgya hai book wapis krne ke liye
// why nod cron because agar server down bhi hota hai to bhi ye shi chlega
export const notifyUsers=()=>{
    cron.schedule("*/30 * * * *",async()=>{
        try{
            const oneDayAgo=new Date(Date.now()-24*60*60*1000);
            const borrowers=await Borrow.find({
                dueDate:{
                    $lte:oneDayAgo,
                },
                returnDate:null,
                notified:false,
            })
            for(const element of borrowers){
                if(element.user&&element.user.email){
                    await sendEmail({
                        email: element.user.email,
                        subject: "Book Return Reminder",
                        message: `Dear ${element.user.name}\n\nThis is a reminder that the book you borrowed is due for return today. Please return the book to the library to avoid any late fees.\n\nThank you,\nLibrary Management`
                 });
                    element.notified=true;
                    await element.save();
                    console.log(`Email sent to ${element.user.email}`);

                }
            }

        }catch(error){
            console.error("Some error occured while notifying users..")

        }

    })
}


