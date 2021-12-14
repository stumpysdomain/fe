"use strict";

const getOutput = document.querySelector("#getOutput");

//delete
document.querySelector("#deleteform").addEventListener("submit", function (event) {
    event.preventDefault();


    const form = this;
    const hillID = form.userID.value;

    axios
        .delete("https://localhost:8080/delete/${hillID}")
        .then(res => {
            console.log(res);
            form.reset();
            form.userID.focus();
            getUser();

        })

        .catch(err => console.log(err));

});

//create 
document.querySelector("#hillForm").addEventListener("submit", function (event) {
    event.preventDefault(); //disables page refreshing

    console.log("This: ", this);

    const form = this;

    // console.log("hillID", form.id);

    const data = {
        hillID: form.id.value,
        mountainName: form.mountainName.value,
        region: form.region.value,
        height: form.height.value,
        country: form.country.value,

      
    };

    axios
        .post("https://localhost:8080/create", data)
        .then(res => {
            // getUser();
            // form.reset();
            // form.name.focus(); //puts cursor in name field
            console.log(res)
        })
        .catch(err => console.error(err));

});

//read

const getAll = () => {
axios
    .get("https://localhost:8080/getAll")
    .then(res => {

        console.log(res);

        const hills = res.data;

        getAllOutput.innerHTML = "";       //blanks the output field

        for (let hill of hills) {

            const hillContainer = document.createElement("div");

            const hillID = document.createElement("p");
            hillID.innerText = `ID: ${hill.id}`;
            hillContainer.appendChild(hillID);

            const MountainName = document.createElement("p");
            MountainName.innerText = `Mountain Name: ${hill.mountainName}`;
            hillContainer.appendChild(MountainName);

            const Region = document.createElement("p");
            Region.innerText = `Region: ${hill.region}`;
            hillContainer.appendChild(Region);

            const Height = document.createElement("p");
            Height.innerText = `Height: ${hill.height}`;
            hillContainer.appendChild(Height);

            const Country = document.createElement("p");
            Country.innerText = `Height: ${hill.country}`;
            hillContainer.appendChild(Country);

            const hillDelete = document.createElement("button");  //delete button
            hillDelete.innerText = "DELETE";
            hillDelete.addEventListener("click", function () {

                axios
                    .delete("https://localhost:8080/${hillID}")
                    .then(res => {
                        console.log(res);
                        getHill();

                    })

                    .catch(err => console.log(err));


            })
            hillContainer.appendChild(hillDelete);

            getOutput.appendChild(hillContainer);
        }
    })
    .catch(err => console.error(err));
}
