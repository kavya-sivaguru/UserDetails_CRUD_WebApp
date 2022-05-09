const apiUrl = "https://614f6a66a706cd00179b725d.mockapi.io/users";
const getData = async () => {
    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        showTableData(data);
    } catch (error) {
        console.log(error);
    }

}
getData();

const createUser = async () => {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const id = document.getElementById("hidden").value;
        if (id !== '') {
            const resp2 = await fetch(`${apiUrl}/${id}`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email
                    }),
                });
        const result = await resp2.json();
        alert("User updated successfully");
    } else {
        const resp2 = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email
            }),
        });
        const result = await resp2.json();
        document.querySelector("form").reset();
        alert("User created successfully");

    }
    document.querySelector("form").reset();
    document.querySelector("#tbody").innerHTML = "";
    getData();
} catch (error) {
    console.log(error);
}
}
const showTableData = (data) => {
    const tbody = document.getElementById("tbody")
    data.forEach((e) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML = e.id;
        const td2 = document.createElement("td");
        td2.innerHTML = e.name;
        const td3 = document.createElement("td");
        td3.innerHTML = e.email;
        const td4 = document.createElement("td");
        td4.innerHTML = `<button class="btn btn-warning" type="button" onclick="getUserById(${e.id})">Edit</button>
        <button class="btn btn-danger" type="button" onclick="deleteUser(${e.id})">Delete</button>`
        tr.append(td1, td2, td3, td4);
        tbody.append(tr);

    })
}

const deleteUser = async (id) => {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });
        alert("User deleted successfully");
        document.querySelector("#tbody").innerHTML = "";
        getData();

    } catch (error) {
        console.log("error")
    }
    console.log(id);
}

const getUserById = async (id) => {
    try {
        const resp3 = await fetch(`${apiUrl}/${id}`);
        const data = await resp3.json();
        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("hidden").value = data.id;
    } catch (error) {
        console.log("error")
    }
    console.log(id);
}