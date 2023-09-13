const token = '_ojxBw9f639EK0Z3AE_nHDE1sirx1swhgFFHFykZ_wLfo4DIq3OxKui5wf5Dj3ZON0knJDf4q4amclmJ28xJTC334lwEyhJAhGDAVbXt5_cvn_Ui_uE1L7TJXe0AZXYx';

fetch('https://api.yelp.com/v3/businesses/search?location=Fullerton,CA&limit=3', {
    headers: {Authorization: `Bearer ${token}`}
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(err => {
      console.log("There was an error");
    })