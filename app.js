  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ODRiMmYxNS04MzBlLTRkN2MtOWVjZi1kMzdhOGY5NjdhYTkiLCJqdGkiOiI3YjI1MDczZDBjY2VkNzFlMGUzYmE4YWM0NDlkZGZkNGU0ZTYzNzliZDgxMDgyNzc5NDRkZjVkM2YxNjM4OWI5MWQ1MzYxZDZkYWQ2YmQxMyIsImlhdCI6MTY3NDUwNTgzNC42ODc5NDYsIm5iZiI6MTY3NDUwNTgzNC42ODc5NDgsImV4cCI6MTcwNjA0MTgzNC42ODYxMDcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.KDxRjs7dB7wd75QHKL85lE0CTQ4G4FPt0gtQOanyI_IEulLTM_tbKIac5RjQ4fhm7Owj-AzYkRpTLSll6Z7K2iuWiAnltqzEgJWNSH8e2n_w--9euOg6Z5QA2Ej9-a_AX78bF8yvSzqzVxmxn2mIhSIlN6Bg41bY8wAueRlZ51uKeIKOrr-YmD3RrFC8w9VBiiVOgh43uCGVSRlDMi2w9ymfmGr6u6Tt5ElOoB_dPFOWh_RjHH8VHTJ-gVpAAwZdWEKgoln3gXH4_bd2TCKK0T_n3s6vrcFy2JFvCN2foqR8pHBahK_0o1HqaUX7XAwYvD5hRBOeD4DnJFvF02-dlp7d-oIZXNmMTeBdEQSa9JFgxCYY_Dqd9IkU00LToGO_SL3sLrUlj6ywAT_EEJVAvPnHq_cRDWX60caYVD_HmfSKNDErfzUr_KT9hUqq6aA8RYsKhgHbnNThQwF6Po-K9qfQJj_pci4Su3FgqbFkKa6b7FB1HGu945uf3-5kRGGUKVCwoFetDYB-DMLdE4h6roOgeJg61u_3gsVsiHD17gTUAwmxT7B1SjLvzgCD7RngYgkQaNNcFH9oXwZeISh0OEYVxOciHjgTrShUIPqms-I8xwB-MAavVvDTTjNAq1MtJyQ6jGU0dYis4-BW-YEjxXI30CZAzD6bYNy2PcOYnBg";
  const headers = new Headers({
    "Authorization": "Bearer " + token,
    "accept": "application/json",
    "Content-Type": "application/json"

  });
  const options = {
    method: "GET",
    headers: headers,
  };

const form = document.getElementById("search-form");
form.addEventListener("submit", searchUsers);

async function searchUsers(event) {
    event.preventDefault();
    const firstname = document.getElementById("name").value;
    const birthday = document.getElementById("birthdate").value;

    if (firstname == "" && birthday == "") {
      alert("Debes ingresar un valor en el campo de nombre o de fecha de nacimiento")
      window.location.reload();
    };

    let apiUrl;

    if (birthday && firstname){
      apiUrl = `https://api.selectinsurance.info/api/v1/vtiger/contacts?=&firstname=${firstname}&birthday=${birthday}`
    }

    if (!birthday) {
      apiUrl = `https://api.selectinsurance.info/api/v1/vtiger/contacts?=&firstname=${firstname}`;
      
    } else{
      apiUrl = `https://api.selectinsurance.info/api/v1/vtiger/contacts?=&birthday=${birthday}`;
    }

    
    try{
      let response = await fetch(`${apiUrl}`,options);
      let data = await response.json();
  
      if (data.data.length == 0) {
        alert("No hay resultados para el criterio de búsqueda");
        window.location.reload();
      }

      if(data.status === 'success'){
        const users = data.data;
        const resultsBody = document.getElementById("resultsBody");
      resultsBody.innerHTML = "";
      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `<td id="results_Tablets">${user.firstname} ${user.lastname}</td>
                        <td id="results_Tablets">${user.birthday}</td>
                        <td id="results_Tablets">${user.assigned_user_data.userlabel}</td>`;
        resultsBody.appendChild(row);
      });
    }else{
      console.log(data.status);
    }
  } catch(error){
    console.log(error);
  }
}