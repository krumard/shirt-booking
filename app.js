const API_URL =
"https://script.google.com/macros/s/AKfycbw63SkepQNsgD7c-i_92nk4Q-DstLNVT9jX3zPuuyohkPBxJr1ieVLD0qCS6SGb8G0OdA/exec";


const form =
document.getElementById("bookingForm");


form.addEventListener(
"submit",
async function(event) {

    event.preventDefault();

    const name =
    document.getElementById("name").value;

    const phone =
    document.getElementById("phone").value;

    const size =
    document.getElementById("size").value;

    const qty =
    document.getElementById("qty").value;

    const data = {

        name: name,
        phone: phone,
        size: size,
        qty: Number(qty)

    };


    document.getElementById("message")
    .innerHTML =
    "⏳ กำลังบันทึก...";


    try {

        await fetch(API_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                "text/plain"

            },

            body:
            JSON.stringify(data)

        });


        document.getElementById("message")
        .innerHTML =
        "✅ จองเสื้อสำเร็จ";


        form.reset();


        document
        .getElementById("qty")
        .value = 1;


        setTimeout(
        loadSummary,
        1500
        );


    } catch(error) {

        document.getElementById("message")
        .innerHTML =
        "❌ เกิดข้อผิดพลาด";

    }

});
