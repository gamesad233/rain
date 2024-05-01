    // Load financial data from JSON file
    $.getJSON("financial_data.json", function(data){
        var financialData = data;

        // Display financial data
        var financialTable = $('#financialTable').DataTable({
            data: financialData,
            columns: [
                { data: 'year' },
                { data: 'revenue', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp') },
                { data: 'profit', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp') }
            ]
        });

        // Chart
        var ctx = document.getElementById('financialChart').getContext('2d');
        var financialChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: financialData.map(function(item) { return item.year; }),
                datasets: [{
                    label: 'Revenue',
                    data: financialData.map(function(item) { return item.revenue; }),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Profit',
                    data: financialData.map(function(item) { return item.profit; }),
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return 'Rp' + value.toLocaleString();
                            }
                        }
                    }]
                }
            }
        });
    });

    $(document).ready(function(){
        // Memuat data karyawan dari file JSON saat dokumen siap
        $.getJSON("data_karyawan.json", function(data){
            var employeeData = data; // Menyimpan data karyawan ke dalam variabel local
            // Fungsi untuk menangani klik tombol pencarian
            $("#searchButton").click(function(){
                var searchInput = $("#searchInput").val().trim().toLowerCase();
                // Mengarahkan pengguna ke halaman searching dengan menyertakan nilai pencarian sebagai parameter URL
                window.location.href = "searching.html?id=" + searchInput;
                // Menyimpan data karyawan ke dalam local storage agar bisa diakses di halaman searching.html
                localStorage.setItem('employeeData', JSON.stringify(employeeData));
            });
        });
    });    

    $(document).ready(function(){
        // Load news data from JSON file
        $.getJSON("news_data.json", function(data){
            var newsContent = '';
            $.each(data, function(key, value){
                // Load description content from txt file
                $.get(value.content_txt, function(description) {
                    newsContent += '<div class="card mb-3">';
                    if (value.image) {
                        newsContent += '<img src="' + value.image + '" class="card-img-top" alt="News Image">';
                    }
                    newsContent += '<div class="card-body">';
                    newsContent += '<h5 class="card-title">' + value.title + '</h5>';
                    newsContent += '<p class="card-text">' + description + '</p>';
                    if (value.author) {
                        newsContent += '<p class="card-text">Author: ' + value.author + '</p>';
                    }
                    newsContent += '</div></div>';
                    $('#newsContent').html(newsContent);
                });
            });
        });
    });
    
