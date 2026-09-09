const API_URL =
"https://script.google.com/macros/s/AKfycbw63SkepQNsgD7c-i_92nk4Q-DstLNVT9jX3zPuuyohkPBxJr1ieVLD0qCS6SGb8G0OdA/exec";


const form =
document.getElementById("bookingForm");

const message =
document.getElementById("message");


form.addEventListener(
"submit",
async function(event) {

    event.preventDefault();


    const name =
    document.getElementById("name").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const size =
    document.getElementById("size").value;

    const qty =
    document.getElementById("qty").value;


    if (!name || !size) {

        message.innerHTML =
        "⚠️ กรุณากรอกชื่อและเลือกไซซ์";

        return;
    }


    message.innerHTML =
    "⏳ กำลังบันทึก...";


    try {

        const formData =
        new URLSearchParams();

        formData.append(
            "name",
            name
        );

        formData.append(
            "phone",
            phone
        );

        formData.append(
            "size",
            size
        );

        formData.append(
            "qty",
            qty
        );


        await fetch(
            API_URL,
            {
                method: "POST",

                mode: "no-cors",

                body: formData
            }
        );


        message.innerHTML =
        "✅ จองเสื้อเรียบร้อย";


        form.reset();

        document
        .getElementById("qty")
        .value = 1;


        // รอ Sheet บันทึกก่อนเล็กน้อย
        setTimeout(
            loadSummary,
            1500
        );


    } catch(error) {

        console.error(error);

        message.innerHTML =
        "❌ ไม่สามารถเชื่อมต่อระบบได้";

    }

});



/* =========================
   โหลดข้อมูลยอดจอง
========================= */

function loadSummary() {

    const oldScript =
    document.getElementById(
        "summaryScript"
    );


    if (oldScript) {
        oldScript.remove();
    }


    const script =
    document.createElement(
        "script"
    );


    script.id =
    "summaryScript";


    script.src =
        API_URL +
        "?action=getSummary" +
        "&callback=showSummary" +
        "&t=" +
        Date.now();


    script.onerror =
    function() {

        document
        .getElementById("summary")
        .innerHTML =
        "❌ เชื่อมต่อฐานข้อมูลไม่ได้";

    };


    document.body
    .appendChild(script);

}



/* =========================
   แสดงยอดจอง
========================= */

function showSummary(data) {

    if (!data.success) {

        document
        .getElementById("summary")
        .innerHTML =
        "❌ โหลดข้อมูลไม่สำเร็จ";

        return;
    }


    const summary =
    data.summary;


    let html = "";


    Object.keys(summary)
    .forEach(size => {

        html += `

        <div class="size-row">

            <span>
                👕 ${size}
            </span>

            <strong>
                ${summary[size]} ตัว
            </strong>

        </div>

        `;

    });


    html += `

    <div class="total">

        รวมทั้งหมด
        ${data.total}
        ตัว

    </div>

    `;


    document
    .getElementById("summary")
    .innerHTML =
    html;


    document
    .getElementById("updateTime")
    .innerHTML =
    "อัปเดตล่าสุด "
    +
    new Date()
    .toLocaleTimeString(
        "th-TH"
    );

}



/* โหลดครั้งแรก */

loadSummary();



/* อัปเดตทุก 5 วินาที */

setInterval(
    loadSummary,
    5000
);
