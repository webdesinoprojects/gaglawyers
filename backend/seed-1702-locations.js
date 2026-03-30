require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug } = require('./utils/slugify');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// All 1702 locations
const locations = [
  "Uppal", "Virudhunagar", "Sholavaram", "Siwan", "Shahdol", "Hanspukuria", "Alappuzha", "Baghpat", "Abhirampur", "Jor Bagh", "Poonch", "Quresh Nagar", "Baruipur", "Darjeeling", "Chitlapakkam", "Banaskantha", "Gachibowli", "Janjgir Champa", "Kabirdham", "Mallapur", "Amritsar", "Dhar", "Bansdroni", "Cossipore", "Madiwala", "Gopalganj", "Wazirabad", "Bankra", "Dadar", "Dhakuria", "Shamshabad", "Peerkankaranai", "Jhilmil Colony", "Tarn Taran", "Parsi Colony", "Naraina Vihar", "Mahbubnagar", "Nagaram", "Alandur", "Pratapgarh", "Sambhal", "Pandav Nagar", "Ganjam", "Uttaranchal", "Goa", "Mallepally", "Pammal", "Chitrakoot", "Korba", "Rein Bazar", "Venkatapuram", "Sonitpur", "Anandapur", "Nacharam", "Sri Ganganagar", "Model Town", "Bhattanagar", "Pondicherry", "Bhilwara", "Bandra", "Vidisha", "Ajoy Nagar", "Ayanavaram", "Kupwara", "Mahabubabad", "Kannur", "Cantonment Area", "Jangpura", "Fatehpur", "Patancheru", "Punjagutta", "Vyasarpadi", "Kalahandi", "Azamabad", "Puppalguda", "Rudraprayag", "Nabarangapur", "Tengnoupal", "Vidyaranyapura", "Jogulamba Gadwal", "Borivali", "Maharajgunj", "Keesara", "Prabhadevi", "Jayanagar", "Khantora", "Tapi", "Choolaimedu", "Angul", "Rohtak", "Rani Gunj", "Mirzapur", "Jammu", "Motilal Nagar", "Khammam", "Navy Nagar", "Dhaula Kuan", "Sarai Rohilla", "Ghaziabad", "Dabirpura", "Model Town", "Kishangarh", "Perumbakkam", "Fazilka", "Sadar Bazaar", "Uttarkashi", "Behala", "Khajaguda", "Bhangar Raghunathpur", "Perungalathur", "Nizampet", "Garshyamnagar", "Dankuni", "Garfa", "Shamirpet", "Namchi", "Powai", "Kolathur", "KK Nagar", "Baran", "Kangpokpi", "Kishanganj", "Rangareddy", "Virar", "Nizamuddin West", "Khar", "Vinobha Bhave", "Kendrapara", "DN Nagar", "Balkampet", "Sabarkantha", "Katni", "Mamit", "Dibang Valley", "Gautham Nagar", "Nagapattinam", "Sibsagar", "Jajpur", "Koderma", "Bargarh", "Chittaurgarh", "Bhandup", "Balangir", "Khadi", "Kondapur", "Karnal", "Chira Bazaar", "Kanshiram Nagar", "Kasaragod", "Kidderpore", "Dharmatala", "Buita", "Alipore", "Tirusulam", "Padmarao Nagar", "Kathua", "Khunti", "Royapettah", "Dhubri", "Salarpur", "Uttan", "Yanam", "Qutbullapur", "Naveen Shahdara", "Hamirpur", "Baguiati", "Wanaparthy", "Ameerpet", "Gulabi Bagh", "Bhuleshwar", "Lokhandwala", "Marredpally", "Kochi", "Jafferkhanpet", "Chikballapur", "Kumaraswamy Layout", "Kotturpuram", "Budge", "Cavel", "Benjanhari Acharial", "Babhai", "Peravallur", "Rampally", "Ranchi", "Osmanabad", "Gaddiannaram", "Mahul", "Ramavaram", "Chirang", "Eksara", "Kodalia", "Red Hills", "Sidhi", "Kurung Kumey", "Bhadrak", "Jhalawar", "Sehore", "Prakasam", "Kamathipura", "Viluppuram", "Sultan Bazar", "Ghazipur", "Moolakadai", "Damu Nagar", "Macha Bollaram", "Shah Ali Banda", "Old Bowenpally", "Kaikhali", "Kalbadevi", "Kaluk", "Ferozepur", "Chamarajanagar", "Gokuldham", "Ullagaram", "Miyapur", "Sitapur", "Umdanagar", "Attapur", "Sriniwaspuri", "Sector 166 Noida", "Nahur", "Vidyanagar", "Valasaravakkam", "Ghatkesar", "Indira Gandhi International Airport", "Bahraich", "Rangareddi", "Amrut Nagar", "Sant Kabir Nagar", "Kawardha", "Sonbhadra", "Araria", "Hauz Khas Village", "Kora Kendra", "Basavanagudi", "Baraula", "Sundar Nagar", "Vasai", "Boduppal", "Chengalpattu", "Kestopur", "Chak Kashipur", "Dostpur Mangroli", "Beliaghata", "Palam", "Uttar Pradesh", "Chatra", "Palakkad", "Shahjahanpur", "Sonapur", "Kangra", "Amboli", "Marine Drive", "PL Lokhande Marg", "Poonamallee", "Golaghat", "Kulgam", "Alipurduar", "Karimnagar", "Bageshwar", "Baidyabati", "Paschim Vihar", "Sonepur", "Moghalpura", "Deoria", "Barkas", "Asalfa", "Gurugram", "Manikonda", "RC Puram", "Daman", "Garhwa", "Vanagaram", "Chandrayan Gutta", "Jogeshwari West", "Medavakkam", "Barmer", "Padmanabhanagar", "Bikramgarh", "Nirmal", "Kondli", "Ganye Gangadharpur", "Somajiguda", "Bhasa Bishnupur", "Bhadrakali", "Jagadishpur", "Neemuch", "Jogeshwari", "Entally", "Bhiwadi", "Shravasti", "Bijoygarh", "Vikhroli", "Kolasib", "Dindigul", "Saharsa", "Cumbala Hill", "Gurgaon", "Chintalakunta", "Egmore", "Bankura", "Sainik Farm", "Mahim", "Kandivali West", "Marine Lines", "Musheerabad", "Tis Hazari", "Shivajinagar", "Bowenpally", "Golnaka", "Supaul", "Pherzawl", "Theni", "Kashmere Gate", "Royapuram", "Kurla", "Girish Park", "Chandrapur", "Mira Bhayandar", "Seshadripuram", "Kattupakkam", "Bellandur", "Champapet", "Telangana", "Ratnagiri", "Harinavi", "Budgam", "Etah", "Sangam Vihar", "Pratapgarh", "Yeshwanthpur", "Bandipore", "Koyambedu", "Sahibganj", "Ballia", "Besant Nagar", "Rajouri Garden", "Ambedaker Nagar", "Faridabad", "Barakhamba Road", "Vithal Wadi", "Matunga", "Port Blair", "Aliabad", "Balod", "Unakoti", "Mandala", "Kankurgachi", "Hasmathpet", "Namalagundu", "Surapet", "Tiruvallikeni", "Barpeta", "Rajgarh", "Jeevanbheemanagar", "Alwarpet", "Baleshwar", "Asif Nagar", "Nanganallur", "Chandannagar", "Beeramguda", "Toothukudi", "Gaiwadi Lane", "Dilsukhnagar", "Koraput", "New Friends Colony", "East Bangalore", "Poonam Nagar", "Hugli", "Tondiarpet", "Mungeli", "Parel", "Madeenaguda", "Baudh", "Anugul", "Kesabpur", "Reasi", "Kengeri", "Hazaribag", "Suryapet", "Saki Naka", "Baksa", "Firozabad", "Lower Parel", "Borivali East", "Pattabiram", "Thirumangalam", "Biswanath", "Yakutpura", "Varthur", "Lingojiguda", "Eranavur", "Baloda Bazar", "Tumakuru", "Dharmapuri", "Bakhtawarpur", "Chandivali", "Mainpuri", "Krishna", "Girinagar", "Mori Gate", "Nesapakkam", "Hanuman Nagar", "Madannapet", "Jawaharnagar", "Sitaphalmandi", "Anjanapura", "Malharrao Wadi", "Tikamgarh", "Fort St George", "Kotwali", "Jashpur", "Char Kaman", "Vijayapura", "Nalgadha", "Bagbazar", "Nimar", "Gautam Buddha Nagar", "Vikrampuri", "Jamtara", "Pant Nagar", "Poisar", "Lakdikapool", "Kamala Nagar", "Mozamjahi Market", "Kottayam", "Currey Road", "Dhirubhai Parekh Marg", "Argari", "Hayathnagar", "Majuli", "Lalbaug", "Mehdipatnam", "Madhubani", "Noorkhan Bazar", "Karauli", "Lawngtlai", "Ichapore", "Civil Lines", "Cochin", "Ballari", "Jalore", "Ramamurthy Nagar", "Dr Viegas Street", "Peren", "Arumbakkam", "INA Colony", "Raidurg", "Dumka", "Krishnarajapuram", "Jadavpur", "Jamil Nagar", "Nallakunta", "Pudupet", "Netaji Nagar", "Yousufguda", "Dhenkanal", "Dindori", "Asuti", "Bangur Avenue", "Jhunjhunu", "Bilaspur", "Suchitra Center", "Kasba", "Sarai Sadar", "Muktsar", "Langar Houz", "Barwani", "Serchhip", "Mahisagar", "Janupada", "Ramanagara", "Kanpur", "Churchgate", "Morena", "Howrah", "Barasat", "Nalbari", "Rayagada", "Karur", "Aravalli", "Suraram", "Oshiwara", "Champawat", "Bishnupur", "Koppal", "Adilabad", "Yamuna Vihar", "Sarvodaya Enclave", "Khagaria", "Sangareddy", "Gandhi Nagar", "Kanchrapara", "Yelahanka", "Barabanki", "Boggulkunta", "Ghatkopar", "Yapral", "Cachar", "Chetput", "Sirohi", "Madhavaram", "Erragadda", "Mangaladevi Marg", "Shiyomi", "Longleng", "Vikaspuri", "Charu Market", "Bokaro", "Balarampur Budge", "Adikmet", "Pisal Banda", "Pakaur", "Saran", "Gandipet", "Shahpur Govardhanpur", "Prakash Nagar", "Pallavaram", "Lachung", "Dadasaheb Parulekar Marg", "Domlur", "Deonar", "Villivakkam", "Balanagar", "Keota Hooghly", "Bally Howrah", "Maharastra Nagar", "Palamu", "Ram Wadi", "Champaran", "Damoh", "Garhi Samastpur", "Halisahar", "Cuffe Parade", "Koti", "Birlapur", "Narapally", "Kishtwar", "Kurukshetra", "Narayanpur", "Laxminagar Colony", "Malakpet", "Afzal Gunj", "Saroornagar", "Washermanpet", "Korea", "Tambaram", "Gerugambakkam", "Lower Subansiri", "Bagalkot", "Tiruvarur", "Teynampet", "Anand", "Perambur", "Ambala", "Chembur", "Chanakyapuri", "Chandigarh", "Puzhal", "Mandaveli", "Mannady", "Mylargadda", "Pulianthope", "Tamenglong", "Safilguda", "Ashoknagar", "Hassan", "Bansberia", "Mayurbhanj", "Bihar", "Utkarsh Nagar", "Kaithal", "Rohini", "Jankalyan Nagar", "Nicobar", "Pakkam", "Jangaon", "Old Alwal", "Kozhikode", "Banswara", "Nuh", "Gumla", "Sheikhpura", "Andheri", "Bamunari", "Kamla Nagar", "Dhapa", "Barkalikapur", "Breach Candy", "Kajuwadi", "Byculla", "Baramula", "Dhemaji", "Arekere", "Jetia", "Bharat Nagar", "Magathane", "Amethi", "Umerwadi", "Charkhi Dadri", "Andaman and Nicobar", "Narsimhapur", "Sunder Nagar", "Chittaranjan Park", "Lalitpur", "Amodghata", "Sagar Pur", "Tripura", "Amtala", "Konnagar", "Panipat", "Banupur", "Punjabi Bagh", "Vijayanagar", "Palwal", "Orissa", "Gaushala", "Chor Bazaar", "Kamarhati", "Bhandardaha", "Madambakkam", "Nawab Saheb Kunta", "Neeti Bagh", "Dalupura", "Srinagar colony", "Chhatarpur", "Injambakkam", "Colaba", "Pathanamthitta", "Panchkula", "Barnala", "Daulatpur Bishnupur", "Kalua Maheshtala", "Selaiyur", "Belgharia", "Secunderabad", "Thakur Village", "Rajender Nagar", "Rajiv Gandhi International Airport", "Manapakkam", "Domlur", "Burrabazar", "Agarpara", "Srikakulam", "Alapakkam", "Hatgachha", "Kannada", "Pratapgarh", "Mayur Vihar", "South Salmara Mankachar", "Ganderbal", "Jagatdal", "Kra Daadi", "Garhwal", "Narsinghpur", "Uppal Kalan", "Vasanth Nagar", "Azamgarh", "Chanddandaha", "Munger", "JB Nagar", "Bhadohi", "Mandya", "Jamui", "Kashimira", "Kashmiri Gate", "Kalyan Nagar", "Timarpur", "Rajarajeshwari Nagar", "Hisar", "Bidyadharpur", "Hailakandi", "Ashok Nagar", "Chandel", "Maharajganj", "Purana Pul", "Chakapara", "Batanagar", "Koriya", "Ferozguda", "Hridaypur", "Khargone", "Shimpoli", "Una", "Bachupally", "Ibrahim Patnam", "Garo Hills", "Jhandewalan", "Tawang", "Neredmet", "Buxar", "Ghusuri", "Pragathi Nagar", "Begum Pur", "Kavadiguda", "Chilkalguda", "Himayatnagar", "Kandivali East", "Bhayandar", "Balaghat", "Shastri Park", "Andaman", "Aghapura", "Noombal", "Thirumullaivoyal", "Ariyalur", "Charkop", "Haryana", "Haltu", "Faizabad", "Halav Pool", "Dava Bazaar", "Rajsamand", "West Bengal", "Tilaknagar", "Hatiara", "Khanpur", "Parsigutta", "Ukhrul", "Darrang", "Pragati Maidan", "Shahran Market", "Sarvoday Nagar", "Changlang", "Chhaprauli Bangar", "Gonda", "Kolar", "Begur", "Himachal Pradesh", "Baghajatin", "Virugambakkam", "Gottigere", "Satara", "Dharmapur", "Medak", "Mallampet", "Kothnur", "Kazhipattur", "Patan", "Belagavi", "Jhargram", "Thiruvotriyur", "Karala", "Bamangachhi", "Tiruvallur", "Pithoragarh", "Bhadradri Kothagudem", "Nemilichery", "Pelling", "Chandauli", "Kishanganj", "Krishnagiri", "Ashok Vihar", "Dharwad", "Kheda", "Tenkasi", "Mount Road", "Vazira Naka", "Jhorhat", "Mathikere", "Kurnool", "Datia", "Golf Green", "Indiranagar", "NayaBans", "Uppuguda", "Kalina", "Rajnandgaon", "Mumbai", "Keelkattalai", "Dinajpur", "Bow Barracks", "Janbazar", "Kodagu", "Ameenpur", "Kanyakumari", "Mansa", "Nehru Nagar", "Bijpur", "Aminjikarai", "Bally Jagachha", "Kodungaiyur", "Bajidpur", "Sembakkam", "JP Nagar", "Kukatpally", "Pali", "Inderpuri", "Dhamtari", "Malvani", "Nolambur", "Kamrup", "Minjur", "Sanathnagar", "Chamba", "Navsari", "Kollam", "Deogarh", "Trimulgherry", "Moosarambagh", "Buldhana", "Vikas Nagar", "Shajapur", "Yamuna Nagar", "Kanker", "Medipally", "Kalbadevi Road", "Thrissur", "Haridevpur", "Bhangel Begampur", "Vallalar Nagar", "Hyderabad", "Jorasanko", "Worli", "Vanasthalipuram", "Lal Darwaza", "Sawai Madhopur", "Chitradurga", "Dantewada", "Joka", "Gorai", "Jagdusha Nagar", "Kakching", "Vikarabad", "Karaikal", "Bowali", "Nuapada", "Gopalapuram", "Banka", "Jafarpur", "Nandurbar", "Hoodi", "Birbhum", "Yuksom", "Durg", "Jogeshwari East", "Old Neredmet", "Madhepura", "Iyyapanthangal", "Nancy Colony", "Lakshadweep", "Vakola", "Pakur", "Dzongu", "Chinsurah", "Fatehabad", "Rajauri", "Yogi Nagar", "Thuraipakkam", "Kottur", "Churu", "Chetla", "Lakshadweep", "Thiruninravur", "Purnia", "Gadchiroli", "Kanniyakumari", "Gobindapur Bhangar", "Pali Naka", "Ammuguda", "Defence Colony", "Kodarma", "Balaji Mandir", "Banda", "Hojai", "Kavi Nirav Lane", "New Usmanpur", "Leh Ladakh", "Mudichur", "Palghar", "Sithalapakkam", "Cooch Behar", "Santhome", "Phek", "Baranagar", "Sharfabad", "Jharsuguda", "Alaknanda", "Kondagaon", "Rasulpur Nawada", "Ernakulam", "Alirajpur", "Kalyani", "Narsingi", "Najafgarh", "Chata Kalikapur", "Kachiguda", "Vasant Vihar", "Nawanshahr", "Shakti Nagar", "Cherlapally", "Tardeo", "Papum Pare", "Shivaji Talav", "Pozhichalur", "Peerzadiguda", "Marol", "Balrampur", "Gondalpara", "Nithari", "Ramnagar", "Babughat", "Purulia", "Sainikpuri", "BBD Bagh", "Sarojini Nagar", "Ramanathapuram", "Munirka", "Komaram Bheem Asifabad", "Champdani", "Jayprakash Nagar", "Dahisar", "Godda", "Govandi", "Tiruvannamalai", "Hazipur", "Mahalaxmi", "Avadi", "Gijhaur", "Annanur", "West Mambalam", "Sultanpur", "Murshidabad", "Nagarkurnool", "Badichowdi", "Nawada", "Budaun", "Sitamarhi", "Birati", "Senapati", "Chrompet", "Versova", "Karwan", "Vivek Vihar", "Tashilanagar", "Burhanpur", "Kolkata", "Pandurangwadi", "Kammanahalli", "Sheohar", "Altamount Road", "Jhundpura", "Rupnagar", "Chikmagalur", "Sahyadri Nagar", "Jalpaiguri", "Balrampur", "Borivali West", "Vile Parle", "Shivamogga", "Assam", "Kadamtala", "Mogappair", "Haora", "Choolai", "Nungambakkam", "Mahe", "Nagali Sakpur", "Pophalwadi", "Rajendranagar", "Ranipet", "Saidapet", "Kalara", "Yadadri Bhuvanagiri", "Singrauli", "Dholpur", "Gorakhpur", "Domjur", "Wardha", "Kushaiguda", "Bommasandra", "Paharganj", "Chintal Basti", "Puzhuthivakkam", "Mahabubnagar", "Mandla", "Mahavir Nagar", "Moulivakkam", "Mathur", "Borabanda", "Chowringhee", "Dwarka", "Tatya Gharpure Marg", "Bulandshahr", "Dang", "Puthagaram", "Dhobitalao", "Bishanpura", "Bandra", "Palavakkam", "Dwarka", "Anna Nagar", "Rajiv Gandhi Nagar", "Farrukhabad", "Thiruneermalai", "Kasaiwada", "Udden Gadda", "Medchal", "Madipakkam", "Karkhana", "Vishwas Nagar", "Sepahijala", "Malleswaram", "Diu", "Dabri", "Ankurhati", "Horamavu", "Shenoy Nagar", "Hamirpur", "Chhajarsi", "Chakala", "Chikkadpally", "Christian Gaon", "Basi", "Kokrajhar", "Yavatmal", "Kamalgazi", "Hastinapuram", "Hingoli", "Bipra Noapara", "Jagruti Nagar", "Bilaspur", "Banaswadi", "Tiruverkadu", "Dahod", "Siang", "Hulimavu", "Ekbalpur", "Karol Bagh", "Mancherial", "Amroha", "Longding", "Thiruvallur", "Sindhi Colony", "Rohilapur", "Pet Basheerabad", "Mahipalpur", "Gadag", "Nabarangpur", "Khardaha", "Koliwada", "Erode", "Zunheboto", "Raipur Khadar", "Ulsoor", "Bundi", "Jharkhand", "Sanghi Nagar", "Belur", "Saligramam", "Meerpet", "Dagdi Chawl", "Cotton Green", "Kompally", "Girgaon", "Rampur", "Chengicherla", "RT Nagar", "Jalna", "Chamrail", "Bazarghat", "Kanyanagar", "Koombarwara", "Ekkaduthangal", "Bilaspur", "Nadia", "Debagarh",
  // International
  "United States USA", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "Canada", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon",
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City",
  "Mexico", "United Arab Emirates UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Jeddah", "Riyadh", "Qatar", "Doha", "Kuwait", "Oman", "Melbourne", "Bahrain", "Sydney", "Australia", "New Zealand", "England", "Wales", "Singapore", "Russia", "Moscow", "Saint Petersburg", "Berlin", "Zurich", "Geneva", "Tatarstan", "Krasnodar Krai", "Scotland", "Brisbane", "Perth", "Adelaide", "Canberra", "Auckland", "Wellington", "Christchurch", "Hamilton", "New Plymouth", "Greymouth", "Invercargill", "Gisborne", "Nelson", "Blenheim", "Richmond", "Tauranga", "Dunedin", "Napier", "Palmerston North", "Whangarei", "Hastings"
];

// Geographic categorization for better SEO
const categorizeLocation = (location) => {
  const internationalLocations = [
    'United States USA', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    'Canada', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon',
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City',
    'Mexico', 'United Arab Emirates UAE', 'Dubai', 'Abu Dhabi', 'Saudi Arabia', 'Jeddah', 'Riyadh', 'Qatar', 'Doha', 'Kuwait', 'Oman', 'Melbourne', 'Bahrain', 'Sydney', 'Australia', 'New Zealand', 'England', 'Wales', 'Singapore', 'Moscow', 'Saint Petersburg', 'Berlin', 'Zurich', 'Geneva', 'Tatarstan', 'Krasnodar Krai', 'Scotland', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'New Plymouth', 'Greymouth', 'Invercargill', 'Gisborne', 'Nelson', 'Blenheim', 'Richmond', 'Tauranga', 'Dunedin', 'Napier', 'Palmerston North', 'Whangarei', 'Hastings'
  ];

  return {
    isInternational: internationalLocations.includes(location),
    country: internationalLocations.includes(location) ? (location.includes('USA') ? 'United States' : location) : 'India'
  };
};

// Generate SEO-optimized content for each location
const generateLocationContent = (city, serviceName, serviceSlug) => {
  const { isInternational, country } = categorizeLocation(city);
  const locationPrefix = isInternational ? `${city}` : `${city}, India`;
  
  return {
    heading: `${serviceName} in ${city}`,
    intro: `GAG Lawyers - Grover & Grover Advocates provides expert ${serviceName.toLowerCase()} services in ${locationPrefix}. Our experienced team of advocates delivers comprehensive legal solutions tailored to your specific needs.`,
    sections: [
      {
        title: `Why Choose Our ${serviceName} Services in ${city}`,
        content: `When it comes to ${serviceName.toLowerCase()} in ${locationPrefix}, GAG Lawyers stands out for our commitment to excellence, client-focused approach, and proven track record. Our legal team has extensive experience handling complex cases and providing strategic counsel.`
      },
      {
        title: 'Our Approach',
        content: `We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable and personally relevant. We work in close partnership with our clients throughout the entire process.`
      },
      {
        title: `Contact Our ${city} Legal Team`,
        content: `If you need ${serviceName.toLowerCase()} assistance in ${locationPrefix}, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward. Contact us today to discuss your legal needs.`
      }
    ]
  };
};

// Generate SEO metadata
const generateSEO = (city, serviceName, serviceSlug) => {
  const { isInternational } = categorizeLocation(city);
  const locationSuffix = isInternational ? city : `${city}, India`;
  
  return {
    title: `${serviceName} in ${city} | GAG Lawyers - Expert Legal Services`,
    description: `Looking for ${serviceName.toLowerCase()} in ${locationSuffix}? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`,
    keywords: `${serviceName.toLowerCase()} ${city}, lawyers in ${city}, advocates in ${city}, legal services ${city}, ${serviceSlug} ${city}`,
    h1: `${serviceName} in ${city}`
  };
};

// Main seeding function
const seedLocationPages = async () => {
  try {
    await connectDB();

    console.log('🔍 Checking existing services...\n');
    const services = await Service.find({}).sort({ order: 1 });
    
    if (services.length === 0) {
      console.error('❌ No services found in database!');
      console.log('💡 Please run: node seed-services.js first\n');
      process.exit(1);
    }

    console.log(`✅ Found ${services.length} services:\n`);
    services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service._id})`);
    });
    console.log('');

    // Ask user which service(s) to create pages for
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 CONFIGURATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('You have 2 options:\n');
    console.log('   Option 1: Create pages for ONE service (recommended for testing)');
    console.log(`              → Will create ${locations.length} pages\n`);
    console.log('   Option 2: Create pages for ALL services');
    console.log(`              → Will create ${locations.length * services.length} pages\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚙️  CURRENT CONFIGURATION (edit script to change):\n');
    
    // CONFIGURATION: Edit these variables
    const CREATE_FOR_ALL_SERVICES = false; // Set to true to create for all services
    const SELECTED_SERVICE_INDEX = 0; // Index of service to use (0 = first service)
    const SET_ACTIVE = true; // Set pages as active (true) or inactive (false)
    const BATCH_SIZE = 100; // Insert in batches for better performance
    
    console.log(`   Create for all services: ${CREATE_FOR_ALL_SERVICES ? '✅ YES' : '❌ NO'}`);
    if (!CREATE_FOR_ALL_SERVICES) {
      console.log(`   Selected service: ${services[SELECTED_SERVICE_INDEX]?.title || 'N/A'}`);
    }
    console.log(`   Set as active: ${SET_ACTIVE ? '✅ YES' : '❌ NO'}`);
    console.log(`   Batch size: ${BATCH_SIZE}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const servicesToProcess = CREATE_FOR_ALL_SERVICES 
      ? services 
      : [services[SELECTED_SERVICE_INDEX]];

    if (!servicesToProcess[0]) {
      console.error('❌ Invalid service selection!');
      process.exit(1);
    }

    console.log('🚀 Starting location page generation...\n');
    
    let totalCreated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    for (const service of servicesToProcess) {
      console.log(`📍 Processing service: ${service.title}`);
      console.log(`   Service ID: ${service._id}`);
      console.log(`   Creating ${locations.length} location pages...\n`);

      const locationPages = [];
      const existingSlugs = new Set();

      // Check existing slugs for this service to avoid duplicates
      const existing = await LocationPage.find({ 
        service: service._id 
      }).select('slug city');
      
      existing.forEach(page => {
        existingSlugs.add(page.slug);
      });

      console.log(`   ℹ️  Found ${existing.size} existing pages for this service\n`);

      // Generate location pages
      for (const city of locations) {
        const baseSlug = generateSlug(`${service.title}-${city}`);
        
        // Skip if slug already exists
        if (existingSlugs.has(baseSlug)) {
          totalSkipped++;
          continue;
        }

        const content = generateLocationContent(city, service.title, service._id);
        const seo = generateSEO(city, service.title, generateSlug(service.title));

        locationPages.push({
          service: service._id,
          serviceName: service.title,
          city: city,
          slug: baseSlug,
          content,
          seo,
          isActive: SET_ACTIVE,
          views: 0
        });

        existingSlugs.add(baseSlug);
      }

      // Insert in batches for better performance
      if (locationPages.length > 0) {
        console.log(`   📦 Inserting ${locationPages.length} new pages in batches of ${BATCH_SIZE}...`);
        
        for (let i = 0; i < locationPages.length; i += BATCH_SIZE) {
          const batch = locationPages.slice(i, i + BATCH_SIZE);
          try {
            await LocationPage.insertMany(batch, { ordered: false });
            totalCreated += batch.length;
            process.stdout.write(`\r   ✅ Progress: ${totalCreated}/${locationPages.length} pages created`);
          } catch (error) {
            if (error.code === 11000) {
              totalSkipped += batch.length;
            } else {
              totalErrors += batch.length;
              console.error(`\n   ⚠️  Error in batch ${i / BATCH_SIZE + 1}:`, error.message);
            }
          }
        }
        console.log('\n');
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ LOCATION PAGES SEEDING COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`📊 SUMMARY:`);
    console.log(`   ✅ Created: ${totalCreated} pages`);
    console.log(`   ⏭️  Skipped: ${totalSkipped} pages (already exist)`);
    if (totalErrors > 0) {
      console.log(`   ❌ Errors: ${totalErrors} pages`);
    }
    console.log(`\n   📍 Total locations processed: ${locations.length}`);
    console.log(`   🔧 Services processed: ${servicesToProcess.length}`);
    console.log(`\n🎉 Your location pages are ready!\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 NEXT STEPS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('   1. View pages in admin: http://localhost:5173/admin/locations');
    console.log('   2. Check sitemap: http://localhost:5000/sitemap.xml');
    console.log('   3. Visit a sample page: http://localhost:5173/locations/[slug]');
    console.log('\n   💡 Tip: Use bulk toggle in admin to activate/deactivate pages\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
};

// Run the seeding
seedLocationPages();
