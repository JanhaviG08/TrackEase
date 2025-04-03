const railwayStations = [
    {
        title: "Kolhapur Station",
        image: "https://st2.indiarailinfo.com/kjfdsuiemjvcya1/0/4/2/0/3572420/0/53922458.jpg",
        description: "Kolhapur Railway Station, also known as Chhatrapati Shahu Maharaj Terminus, is a major railway station in Kolhapur, Maharashtra. It serves as a key hub for trains connecting to various parts of the state and country.",
        location: "Kolhapur, Maharashtra, India",
        contact: 2867365787,
        city: "Kolhapur"
    },
    {
        title: "Pune Station",
        image: "https://images.hindustantimes.com/img/2022/07/26/550x309/4e47b014-0cfa-11ed-a1d6-b1f7c7e6fb11_1658861713414.jpg",
        description: "Pune Junction is one of the busiest railway stations in Maharashtra, serving the city of Pune. It is a major hub for both passenger and freight trains, connecting to various parts of India.",
        location: "Pune, Maharashtra, India",
        contact: 1234567890,
        city: "Pune"
    },
    {
        title: "Mumbai CST",
        image: "https://images.indianexpress.com/2020/03/mumbai-759.jpg?w=600",
        description: "Chhatrapati Shivaji Maharaj Terminus (CSMT) is a historic railway station and a UNESCO World Heritage Site in Mumbai. It is one of the busiest railway stations in India, serving as a major hub for both local and long-distance trains.",
        location: "Mumbai, Maharashtra, India",
        contact: 9876543210,
        city: "Mumbai"
    },
    {
        title: "Nagpur Station",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Nagpur_Railway_Station_Stitch.jpg/1200px-Nagpur_Railway_Station_Stitch.jpg",
        description: "Nagpur Railway Station is a major railway junction in Maharashtra, serving the city of Nagpur. It is an important transit point for trains traveling between northern and southern India.",
        location: "Nagpur, Maharashtra, India",
        contact: 1122334455,
        city: "Nagpur"
    },
    {
        title: "Nashik Road Station",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Nasik_Road_railway_station_-_Main_Entrance.jpg",
        description: "Nashik Road Railway Station serves the city of Nashik and is a key station on the Central Railway line. It connects Nashik to various parts of Maharashtra and India.",
        location: "Nashik, Maharashtra, India",
        contact: 2233445566,
        city: "Nashik"
    },
    {
        title: "Aurangabad Station",
        image: "https://st2.indiarailinfo.com/kjfdsuiemjvcya0/0/0/1/8/1630018/16608304/dsc00182226543107157.jpg",
        description: "Aurangabad Railway Station serves the city of Aurangabad and is an important station in the Marathwada region. It connects the city to major destinations in Maharashtra and beyond.",
        location: "Aurangabad, Maharashtra, India",
        contact: 3344556677,
        city: "Aurangabad"
    },
    {
        title: "Solapur Station",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Solapur_railway_station1.jpg",
        description: "Solapur Railway Station is a major railway station in Solapur, Maharashtra. It serves as a key junction for trains traveling between southern and western India.",
        location: "Solapur, Maharashtra, India",
        contact: 4455667788,
        city: "Solapur"
    },
    {
        title: "Thane Station",
        image: "https://jugyah-dev-property-photos.s3.ap-south-1.amazonaws.com/thane_s_b28587a46c.webp",
        description: "Thane Railway Station is one of the busiest railway stations in Mumbai, serving the city of Thane. It is a major hub for both local and long-distance trains.",
        location: "Thane, Maharashtra, India",
        contact: 5566778899,
        city: "Thane"
    },
    {
        title: "Dadar Station",
        image: "https://content.jdmagicbox.com/v2/comp/mumbai/84/022p872184/catalogue/dadar-railway-station-dadar-east-mumbai-railway-station-mc6roy0fed.jpg",
        description: "Dadar Railway Station is a major interchange station in Mumbai, connecting the Western and Central Railway lines. It is one of the busiest stations in the city.",
        location: "Mumbai, Maharashtra, India",
        contact: 6677889900,
        city: "Mumbai"
    },
    {
        title: "Bandra Terminus",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAf5CByDtrcExIrXRUDw5GlwZepH0eizK3Fw&s",
        description: "Bandra Terminus is a major railway terminus in Mumbai, serving as a departure point for long-distance trains to various parts of India.",
        location: "Mumbai, Maharashtra, India",
        contact: 7788990011,
        city: "Mumbai"
    },
    {
        title: "Lokmanya Tilak Terminus",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/New-Lokmanya-Tilak-Terminus.jpg",
        description: "Lokmanya Tilak Terminus (LTT) is a major railway terminus in Mumbai, serving as a departure point for long-distance trains to various parts of India.",
        location: "Mumbai, Maharashtra, India",
        contact: 8899001122,
        city: "Mumbai"
    },
    {
        title: "Kalyan Junction",
        image: "https://files.yappe.in/place/full/kalyan-junction-railway-station-8800925.webp",
        description: "Kalyan Junction is a major railway junction in Mumbai, serving as a key interchange point for trains traveling between northern and southern India.",
        location: "Kalyan, Maharashtra, India",
        contact: 9900112233,
        city: "Kalyan"
    },
    {
        title: "Vasai Road Station",
        image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/07/13/704024-mumbai-rains-08.jpg",
        description: "Vasai Road Railway Station is a major station in Vasai, serving as a key hub for both local and long-distance trains.",
        location: "Vasai, Maharashtra, India",
        contact: 1011121314,
        city: "Vasai"
    },
    {
        title: "Panvel Station",
        image: "https://d3mbwbgtcl4x70.cloudfront.net/Panvel_1000x600_e8df6bbaa1.webp",
        description: "Panvel Railway Station is a major station in Panvel, serving as a key hub for both local and long-distance trains.",
        location: "Panvel, Maharashtra, India",
        contact: 1112131415,
        city: "Panvel"
    },
    {
        title: "Lonavala Station",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Lonavla_railway_station_-_Entrance.jpg",
        description: "Lonavala Railway Station is a major station in Lonavala, serving as a key hub for trains traveling between Mumbai and Pune.",
        location: "Lonavala, Maharashtra, India",
        contact: 1213141516,
        city: "Lonavala"
    },
    {
        title: "Karjat Station",
        image: "https://content.jdmagicbox.com/comp/karjat/c9/9999p2141.2141.220127232119.y2c9/catalogue/karjat-railway-station-aamrai-karjat-railway-station-C7tzBoN4Qr.jpg",
        description: "Karjat Railway Station is a major station in Karjat, serving as a key hub for trains traveling between Mumbai and Pune.",
        location: "Karjat, Maharashtra, India",
        contact: 1314151617,
        city: "Karjat"
    },
    {
        title: "Ratnagiri Station",
        image: "https://st2.indiarailinfo.com/kjfdsuiemjvcya5/0/0/0/5/2144005/0/ratnagirirailwaystation.jpg",
        description: "Ratnagiri Railway Station is a major station in Ratnagiri, serving as a key hub for trains traveling along the Konkan Railway line.",
        location: "Ratnagiri, Maharashtra, India",
        contact: 1415161718,
        city: "Ratnagiri"
    },
    {
        title: "Sangli Station",
        image: "https://st2.indiarailinfo.com/kjfdsuiemjvcya0/0/4/8/4/816484/0/970982102001294483498171308423034n.jpg",
        description: "Sangli Railway Station is a major station in Sangli, serving as a key hub for trains traveling between southern and western India.",
        location: "Sangli, Maharashtra, India",
        contact: 1516171819,
        city: "Sangli"
    },
    {
        title: "Satara Station",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6_VQSjagn-jHt6EPiYaW11Cva00T31SNe4DhZme4Yb9v6rijn4YQhuA4&s=10",
        description: "Satara Railway Station is a major station in Satara, serving as a key hub for trains traveling between southern and western India.",
        location: "Satara, Maharashtra, India",
        contact: 1617181920,
        city: "Satara"
    },
    {
        title: "Ahmednagar Station",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ624nNJFLgYJt3qPe8Ql0-3A-D0F5w0QqQHw&s",
        description: "Ahmednagar Railway Station is a major station in Ahmednagar, serving as a key hub for trains traveling between northern and southern India.",
        location: "Ahmednagar, Maharashtra, India",
        contact: 1718192021,
        city: "Ahmednagar"
    }
];

module.exports = {data : railwayStations};