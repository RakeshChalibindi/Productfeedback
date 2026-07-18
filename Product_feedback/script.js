document.getElementById("feedbackForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const customerName = document.getElementById("customer").value;
    const email = document.getElementById("email").value;
    const productName = document.getElementById("product").value;
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value;

    const result = document.getElementById("result");

    result.innerHTML = "Submitting...";

    try {

        const response = await fetch("https://zgfxr06go2.execute-api.ap-southeast-2.amazonaws.com/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerName: customerName,
                email: email,
                productName: productName,
                rating: rating,
                feedback: feedback
            })

        });

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

        let output = data;

        if (data.body) {
            output = JSON.parse(data.body);
        }

        result.innerHTML = `
            <h3 style="color:green;">${output.message}</h3>
            <p><strong>Customer :</strong> ${output.customer}</p>
            <p><strong>Product :</strong> ${output.product}</p>
            <p><strong>Rating :</strong> ${output.rating}</p>
            <p>Thank you for your valuable feedback.</p>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p style="color:red;">
                Unable to connect to API Gateway.<br>
                ${error.message}
            </p>
        `;
    }

});