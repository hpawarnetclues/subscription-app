const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));


sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});


submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});
$(window).resize(function() {
  if (window.innerWidth < 768) {
//    console.log('this')
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
})
loader = document.getElementById('loader')
loader.style.display='block';
chatSocket = new WebSocket('ws://' + window.location.host + '/ws/subscription/');

//when soket is connect success
  chatSocket.onopen = function (e) {
//  console.log("The connection was setup successfully !");
  loader.style.display='none';
  };

  chatSocket.onerror = function(error) {
      alert('something went wrong')
      window.location.href="/admin_dashbord_page"
  }

  chatSocket.onmessage = function (e) {
    check = document.getElementById('plan_table_body')
    

    const data = JSON.parse(e.data);
    if (data['type'] == 'plan_add'){
      child_table = check.getElementsByTagName('tr').length
//      console.log(child_table)
      sr = Number(child_table)+1
//      console.log(sr)
      
      if (data['plan_type'] == 'unlimited'){
        new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>Unlimited</td><td id='planafter"+data['plan_id']+"'>Unlimited</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td><td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td> <td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'>"+data['plan_name']+" </p> <hr class='w-12 border border-green-500 mb-6'> <h3 class='text-3xl font-bold text-green-500 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-green-500 mb-6'> <li>totle Request : Unlimited</li></ul> </div>"
        }
      else{
        new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>"+data['request']+"</td><td id='planafter"+data['plan_id']+"'>"+data['after_cost']+"</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td> <td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td><td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-grey-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-grey-200 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-grey-200 mb-6'> <h3 class='text-3xl font-bold text-grey-200 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-grey-200 mb-6'> <li>totle Request : "+data['request']+"</li> <li>After per Request Charge : "+data['after_cost']+"</li></ul> </div>"
        }
    $('#plan_table_body').append(new_data)
    insertplanform()
    
    shownotification('success','Plan Add Success.')
    }
    else if(data['type'] == 'deleteplan'){
      if (data['sub-type'] == 'success'){
        document.getElementById('plan'+data['plan_id']).style.display='none';
        shownotification('success','Plan Delete Success..')
      }
      else{
        shownotification('error','Something Went Wrong.')
      }
    }
    else if(data['type'] == 'updateplan'){
      if(data['sub-type'] == 'success'){
        if(data['is_unlimited'])
        {
          document.getElementById('planname'+data['plan_id']).innerHTML = data['name']
          document.getElementById('planrequest'+data['plan_id']).innerHTML = 'Unlimited'
          document.getElementById('planafter'+data['plan_id']).innerHTML = 'None'
          document.getElementById('planprice'+data['plan_id']).innerHTML = data['price']
          document.getElementById('planduration'+data['plan_id']).innerHTML = data['duration']
        }
        else{
          document.getElementById('planname'+data['plan_id']).innerHTML = data['name']
          document.getElementById('planrequest'+data['plan_id']).innerHTML = data['request']
          document.getElementById('planafter'+data['plan_id']).innerHTML = data['after']
          document.getElementById('planprice'+data['plan_id']).innerHTML = data['price']
          document.getElementById('planduration'+data['plan_id']).innerHTML = data['duration']

        }
        insertplanform()
//        console.log(data)
        shownotification('success','Plan Update Success.')
      }
      else{
        shownotification('error','Something Wrong.')
      }
    }
  };

  function duration_master(){
    window.location.href = "/admin/master/duration"
  }

  function plan_master(){
    window.location.href = "/admin/master/subscription"
  }

  function active_subscriber(){
    window.location.href = "/admin/subscriber/active"
  }

  $(window).on( 'load' ,function() {
    if (window.innerWidth < 768) {
//      console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  })


function chartload() {
    // Pie Chart Data
    const pieLabels = ["Unlimited", "Limited"];
    const pieData = [55, 49];
    const pieColors = ["#b91d47", "#00aba9"];

    new Chart("myPieChart", {
        type: "doughnut",
        data: {
            labels: pieLabels,
            datasets: [{
                backgroundColor: pieColors,
                data: pieData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: "Revenue Sources"
                }
            }
        }
    });

    // Area Chart Data
    const areaLabels = ['Jan', "Feb", "March", "Aprl", "May", "Jun", "July", "Aug", "Sept", "Nov", "Dec"];
    const areaData = [18000, 20000, 25000, 30000, 35000, 40000, 35000, 30000, 35000, 40000, 50000];

    new Chart("myAreaChart", {
        type: "line",
        data: {
            labels: areaLabels,
            datasets: [{
                label: 'Earnings',
                data: areaData,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Earnings Overview"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Bar Chart Data
    const barLabels = ['Jan', "Feb", "March", "Aprl", "May", "Jun", "July", "Aug", "Sept", "Nov", "Dec"];
    const barData = [5000, 7000, 9000, 11000, 13000, 15000, 14000, 12000, 11000, 10000, 9000];

    new Chart("myBarChart", {
        type: "bar",
        data: {
            labels: barLabels,
            datasets: [{
                label: 'Sales',
                data: barData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Monthly Sales"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Radar Chart Data
    const radarLabels = ['Sales', 'Marketing', 'Development', 'Support', 'Revenue', 'Growth'];
    const radarData = [80, 90, 70, 60, 85, 95];

    new Chart("myRadarChart", {
        type: "radar",
        data: {
            labels: radarLabels,
            datasets: [{
                label: 'Performance',
                data: radarData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Performance Metrics"
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });

    var check = document.getElementById('temp').value;
//    console.log(check);
}

window.onload = function () {
    setTimeout(() => {
        chartload();
    }, 500);
};


  

