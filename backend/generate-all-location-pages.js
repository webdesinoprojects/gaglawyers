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

// All 25 services
const services25 = [
  "Armed Forces Tribunal (AFT) Cases",
  "Bail & Anticipatory Bail Cases",
  "CAT (Central Administrative Tribunal) Matters",
  "Cheque Bounce Cases",
  "Civil Law & Civil Disputes",
  "Contract Dispute Cases",
  "Corporate Law Services",
  "Criminal Defense Cases",
  "Cyber Crime Cases",
  "Divorce & Matrimonial Cases",
  "Debt Recovery (DRT) Cases",
  "Employment & Labour Law Cases",
  "Family Law Disputes",
  "High Court Litigation",
  "Immigration Law Services",
  "Insolvency & Bankruptcy Cases",
  "Insurance Claim & Dispute Cases",
  "Landlord-Tenant Disputes",
  "Motor Accident Claims",
  "NCLT & Company Law Matters",
  "Property & Real Estate Disputes",
  "Supreme Court Litigation",
  "Tax & GST Disputes",
  "Trademark & IP Rights",
  "Wills & Succession Planning"
];

// All 1702 locations (truncated for brevity - use full list from seed-1702-locations.js)
const locations1702 = [
  "Uppal", "Virudhunagar", "Sholavaram", "Siwan", "Shahdol", "Hanspukuria", "Alappuzha", "Baghpat", "Abhirampur", "Jor Bagh", "Poonch", "Quresh Nagar", "Baruipur", "Darjeeling", "Chitlapakkam", "Banaskantha", "Gachibowli", "Janjgir Champa", "Kabirdham", "Mallapur", "Amritsar", "Dhar", "Bansdroni", "Cossipore", "Madiwala", "Gopalganj", "Wazirabad", "Bankra", "Dadar", "Dhakuria", "Shamshabad", "Peerkankaranai", "Jhilmil Colony", "Tarn Taran", "Parsi Colony", "Naraina Vihar", "Mahbubnagar", "Nagaram", "Alandur", "Pratapgarh", "Sambhal", "Pandav Nagar", "Ganjam", "Uttaranchal", "Goa", "Mallepally", "Pammal", "Chitrakoot", "Korba", "Rein Bazar", "Venkatapuram", "Sonitpur", "Anandapur", "Nacharam", "Sri Ganganagar", "Model Town", "Bhattanagar", "Pondicherry", "Bhilwara", "Bandra", "Vidisha", "Ajoy Nagar", "Ayanavaram", "Kupwara", "Mahabubabad", "Kannur", "Cantonment Area", "Jangpura", "Fatehpur", "Patancheru", "Punjagutta", "Vyasarpadi", "Kalahandi", "Azamabad", "Puppalguda", "Rudraprayag", "Nabarangapur", "Tengnoupal", "Vidyaranyapura", "Jogulamba Gadwal", "Borivali", "Maharajgunj", "Keesara", "Prabhadevi", "Jayanagar", "Khantora", "Tapi", "Choolaimedu", "Angul", "Rohtak", "Rani Gunj", "Mirzapur", "Jammu", "Motilal Nagar", "Khammam", "Navy Nagar", "Dhaula Kuan", "Sarai Rohilla", "Ghaziabad", "Dabirpura", "Model Town", "Kishangarh", "Perumbakkam", "Fazilka", "Sadar Bazaar", "Uttarkashi", "Behala", "Khajaguda", "Bhangar Raghunathpur", "Perungalathur", "Nizampet", "Garshyamnagar", "Dankuni", "Garfa", "Shamirpet", "Namchi", "Powai", "Kolathur", "KK Nagar", "Baran", "Kangpokpi", "Kishanganj", "Rangareddy", "Virar", "Nizamuddin West", "Khar", "Vinobha Bhave", "Kendrapara", "DN Nagar", "Balkampet", "Sabarkantha", "Katni", "Mamit", "Dibang Valley", "Gautham Nagar", "Nagapattinam", "Sibsagar", "Jajpur", "Koderma", "Bargarh", "Chittaurgarh", "Bhandup", "Balangir", "Khadi", "Kondapur", "Karnal", "Chira Bazaar", "Kanshiram Nagar", "Kasaragod", "Kidderpore", "Dharmatala", "Buita", "Alipore", "Tirusulam", "Padmarao Nagar", "Kathua", "Khunti", "Royapettah", "Dhubri", "Salarpur", "Uttan", "Yanam", "Qutbullapur", "Naveen Shahdara", "Hamirpur", "Baguiati", "Wanaparthy", "Ameerpet", "Gulabi Bagh", "Bhuleshwar", "Lokhandwala", "Marredpally", "Kochi", "Jafferkhanpet", "Chikballapur", "Kumaraswamy Layout", "Kotturpuram", "Budge", "Cavel", "Benjanhari Acharial", "Babhai", "Peravallur", "Rampally", "Ranchi", "Osmanabad", "Gaddiannaram", "Mahul", "Ramavaram", "Chirang", "Eksara", "Kodalia", "Red Hills", "Sidhi", "Kurung Kumey", "Bhadrak", "Jhalawar", "Sehore", "Prakasam", "Kamathipura", "Viluppuram", "Sultan Bazar", "Ghazipur", "Moolakadai", "Damu Nagar", "Macha Bollaram", "Shah Ali Banda", "Old Bowenpally", "Kaikhali", "Kalbadevi", "Kaluk", "Ferozepur", "Chamarajanagar", "Gokuldham", "Ullagaram", "Miyapur", "Sitapur", "Umdanagar", "Attapur", "Sriniwaspuri", "Sector 166 Noida", "Nahur", "Vidyanagar", "Valasaravakkam", "Ghatkesar", "Indira Gandhi International Airport", "Bahraich", "Rangareddi", "Amrut Nagar", "Sant Kabir Nagar", "Kawardha", "Sonbhadra", "Araria", "Hauz Khas Village", "Kora Kendra", "Basavanagudi", "Baraula", "Sundar Nagar", "Vasai", "Boduppal", "Chengalpattu", "Kestopur", "Chak Kashipur", "Dostpur Mangroli", "Beliaghata", "Palam", "Uttar Pradesh", "Chatra", "Palakkad", "Shahjahanpur", "Sonapur", "Kangra", "Amboli", "Marine Drive", "PL Lokhande Marg", "Poonamallee", "Golaghat", "Kulgam", "Alipurduar", "Karimnagar", "Bageshwar", "Baidyabati", "Paschim Vihar", "Sonepur", "Moghalpura", "Deoria", "Barkas", "Asalfa", "Gurugram", "Manikonda", "RC Puram", "Daman", "Garhwa", "Vanagaram", "Chandrayan Gutta", "Jogeshwari West", "Medavakkam", "Barmer", "Padmanabhanagar", "Bikramgarh", "Nirmal", "Kondli", "Ganye Gangadharpur", "Somajiguda", "Bhasa Bishnupur", "Bhadrakali", "Jagadishpur", "Neemuch", "Jogeshwari", "Entally", "Bhiwadi", "Shravasti", "Bijoygarh", "Vikhroli", "Kolasib", "Dindigul", "Saharsa", "Cumbala Hill", "Gurgaon", "Chintalakunta", "Egmore", "Bankura", "Sainik Farm", "Mahim", "Kandivali West", "Marine Lines", "Musheerabad", "Tis Hazari", "Shivajinagar", "Bowenpally", "Golnaka", "Supaul", "Pherzawl", "Theni", "Kashmere Gate", "Royapuram", "Kurla", "Girish Park", "Chandrapur", "Mira Bhayandar", "Seshadripuram", "Kattupakkam", "Bellandur", "Champapet", "Telangana", "Ratnagiri", "Harinavi", "Budgam", "Etah", "Sangam Vihar", "Pratapgarh", "Yeshwanthpur", "Bandipore", "Koyambedu", "Sahibganj", "Ballia", "Besant Nagar", "Rajouri Garden", "Ambedaker Nagar", "Faridabad", "Barakhamba Road", "Vithal Wadi", "Matunga", "Port Blair", "Aliabad", "Balod", "Unakoti", "Mandala", "Kankurgachi", "Hasmathpet", "Namalagundu", "Surapet", "Tiruvallikeni", "Barpeta", "Rajgarh", "Jeevanbheemanagar", "Alwarpet", "Baleshwar", "Asif Nagar", "Nanganallur", "Chandannagar", "Beeramguda", "Toothukudi", "Gaiwadi Lane", "Dilsukhnagar", "Koraput", "New Friends Colony", "East Bangalore", "Poonam Nagar", "Hugli", "Tondiarpet", "Mungeli", "Parel", "Madeenaguda", "Baudh", "Anugul", "Kesabpur", "Reasi", "Kengeri", "Hazaribag", "Suryapet", "Saki Naka", "Baksa", "Firozabad", "Lower Parel", "Borivali East", "Pattabiram", "Thirumangalam", "Biswanath", "Yakutpura", "Varthur", "Lingojiguda", "Eranavur", "Baloda Bazar", "Tumakuru", "Dharmapuri", "Bakhtawarpur", "Chandivali", "Mainpuri", "Krishna", "Girinagar", "Mori Gate", "Nesapakkam", "Hanuman Nagar", "Madannapet", "Jawaharnagar", "Sitaphalmandi", "Anjanapura", "Malharrao Wadi", "Tikamgarh", "Fort St George", "Kotwali", "Jashpur", "Char Kaman", "Vijayapura", "Nalgadha", "Bagbazar", "Nimar", "Gautam Buddha Nagar", "Vikrampuri", "Jamtara", "Pant Nagar", "Poisar", "Lakdikapool", "Kamala Nagar", "Mozamjahi Market", "Kottayam", "Currey Road", "Dhirubhai Parekh Marg", "Argari", "Hayathnagar", "Majuli", "Lalbaug", "Mehdipatnam", "Madhubani", "Noorkhan Bazar", "Karauli", "Lawngtlai", "Ichapore", "Civil Lines", "Cochin", "Ballari", "Jalore", "Ramamurthy Nagar", "Dr Viegas Street", "Peren", "Arumbakkam", "INA Colony", "Raidurg", "Dumka", "Krishnarajapuram", "Jadavpur", "Jamil Nagar", "Nallakunta", "Pudupet", "Netaji Nagar", "Yousufguda", "Dhenkanal", "Dindori", "Asuti", "Bangur Avenue", "Jhunjhunu", "Bilaspur", "Suchitra Center", "Kasba", "Sarai Sadar", "Muktsar", "Langar Houz", "Barwani", "Serchhip", "Mahisagar", "Janupada", "Ramanagara", "Kanpur", "Churchgate", "Morena", "Howrah", "Barasat", "Nalbari", "Rayagada", "Karur", "Aravalli", "Suraram", "Oshiwara", "Champawat", "Bishnupur", "Koppal", "Adilabad", "Yamuna Vihar", "Sarvodaya Enclave", "Khagaria", "Sangareddy", "Gandhi Nagar", "Kanchrapara", "Yelahanka", "Barabanki", "Boggulkunta", "Ghatkopar", "Yapral", "Cachar", "Chetput", "Sirohi", "Madhavaram", "Erragadda", "Mangaladevi Marg", "Shiyomi", "Longleng", "Vikaspuri", "Charu Market", "Bokaro", "Balarampur Budge", "Adikmet", "Pisal Banda", "Pakaur", "Saran", "Gandipet", "Shahpur Govardhanpur", "Prakash Nagar", "Pallavaram", "Lachung", "Dadasaheb Parulekar Marg", "Domlur", "Deonar", "Villivakkam", "Balanagar", "Keota Hooghly", "Bally Howrah", "Maharastra Nagar", "Palamu", "Ram Wadi", "Champaran", "Damoh", "Garhi Samastpur", "Halisahar", "Cuffe Parade", "Koti", "Birlapur", "Narapally", "Kishtwar", "Kurukshetra", "Narayanpur", "Laxminagar Colony", "Malakpet", "Afzal Gunj", "Saroornagar", "Washermanpet", "Korea", "Tambaram", "Gerugambakkam", "Lower Subansiri", "Bagalkot", "Tiruvarur", "Teynampet", "Anand", "Perambur", "Ambala", "Chembur", "Chanakyapuri", "Chandigarh", "Puzhal", "Mandaveli", "Mannady", "Mylargadda", "Pulianthope", "Tamenglong", "Safilguda", "Ashoknagar", "Hassan", "Bansberia", "Mayurbhanj", "Bihar", "Utkarsh Nagar", "Kaithal", "Rohini", "Jankalyan Nagar", "Nicobar", "Pakkam", "Jangaon", "Old Alwal", "Kozhikode", "Banswara", "Nuh", "Gumla", "Sheikhpura", "Andheri", "Bamunari", "Kamla Nagar", "Dhapa", "Barkalikapur", "Breach Candy", "Kajuwadi", "Byculla", "Baramula", "Dhemaji", "Arekere", "Jetia", "Bharat Nagar", "Magathane", "Amethi", "Umerwadi", "Charkhi Dadri", "Andaman and Nicobar", "Narsimhapur", "Sunder Nagar", "Chittaranjan Park", "Lalitpur", "Amodghata", "Sagar Pur", "Tripura", "Amtala", "Konnagar", "Panipat", "Banupur", "Punjabi Bagh", "Vijayanagar", "Palwal", "Orissa", "Gaushala", "Chor Bazaar", "Kamarhati", "Bhandardaha", "Madambakkam", "Nawab Saheb Kunta", "Neeti Bagh", "Dalupura", "Srinagar colony", "Chhatarpur", "Injambakkam", "Colaba", "Pathanamthitta", "Panchkula", "Barnala", "Daulatpur Bishnupur", "Kalua Maheshtala", "Selaiyur", "Belgharia", "Secunderabad", "Thakur Village", "Rajender Nagar", "Rajiv Gandhi International Airport", "Manapakkam", "Domlur", "Burrabazar", "Agarpara", "Srikakulam", "Alapakkam", "Hatgachha", "Kannada", "Pratapgarh", "Mayur Vihar", "South Salmara Mankachar", "Ganderbal", "Jagatdal", "Kra Daadi", "Garhwal", "Narsinghpur", "Uppal Kalan", "Vasanth Nagar", "Azamgarh", "Chanddandaha", "Munger", "JB Nagar", "Bhadohi", "Mandya", "Jamui", "Kashimira", "Kashmiri Gate", "Kalyan Nagar", "Timarpur", "Rajarajeshwari Nagar", "Hisar", "Bidyadharpur", "Hailakandi", "Ashok Nagar", "Chandel", "Maharajganj", "Purana Pul", "Chakapara", "Batanagar", "Koriya", "Ferozguda", "Hridaypur", "Khargone", "Shimpoli", "Una", "Bachupally", "Ibrahim Patnam", "Garo Hills", "Jhandewalan", "Tawang", "Neredmet", "Buxar", "Ghusuri", "Pragathi Nagar", "Begum Pur", "Kavadiguda", "Chilkalguda", "Himayatnagar", "Kandivali East", "Bhayandar", "Balaghat", "Shastri Park", "Andaman", "Aghapura", "Noombal", "Thirumullaivoyal", "Ariyalur", "Charkop", "Haryana", "Haltu", "Faizabad", "Halav Pool", "Dava Bazaar", "Rajsamand", "West Bengal", "Tilaknagar", "Hatiara", "Khanpur", "Parsigutta", "Ukhrul", "Darrang", "Pragati Maidan", "Shahran Market", "Sarvoday Nagar", "Changlang", "Chhaprauli Bangar", "Gonda", "Kolar", "Begur", "Himachal Pradesh", "Baghajatin", "Virugambakkam", "Gottigere", "Satara", "Dharmapur", "Medak", "Mallampet", "Kothnur", "Kazhipattur", "Patan", "Belagavi", "Jhargram", "Thiruvotriyur", "Karala", "Bamangachhi", "Tiruvallur", "Pithoragarh", "Bhadradri Kothagudem", "Nemilichery", "Pelling", "Chandauli", "Kishanganj", "Krishnagiri", "Ashok Vihar", "Dharwad", "Kheda", "Tenkasi", "Mount Road", "Vazira Naka", "Jhorhat", "Mathikere", "Kurnool", "Datia", "Golf Green", "Indiranagar", "NayaBans", "Uppuguda", "Kalina", "Rajnandgaon", "Mumbai", "Keelkattalai", "Dinajpur", "Bow Barracks", "Janbazar", "Kodagu", "Ameenpur", "Kanyakumari", "Mansa", "Nehru Nagar", "Bijpur", "Aminjikarai", "Bally Jagachha", "Kodungaiyur", "Bajidpur", "Sembakkam", "JP Nagar", "Kukatpally", "Pali", "Inderpuri", "Dhamtari", "Malvani", "Nolambur", "Kamrup", "Minjur", "Sanathnagar", "Chamba", "Navsari", "Kollam", "Deogarh", "Trimulgherry", "Moosarambagh", "Buldhana", "Vikas Nagar", "Shajapur", "Yamuna Nagar", "Kanker", "Medipally", "Kalbadevi Road", "Thrissur", "Haridevpur", "Bhangel Begampur", "Vallalar Nagar", "Hyderabad", "Jorasanko", "Worli", "Vanasthalipuram", "Lal Darwaza", "Sawai Madhopur", "Chitradurga", "Dantewada", "Joka", "Gorai", "Jagdusha Nagar", "Kakching", "Vikarabad", "Karaikal", "Bowali", "Nuapada", "Gopalapuram", "Banka", "Jafarpur", "Nandurbar", "Hoodi", "Birbhum", "Yuksom", "Durg", "Jogeshwari East", "Old Neredmet", "Madhepura", "Iyyapanthangal", "Nancy Colony", "Lakshadweep", "Vakola", "Pakur", "Dzongu", "Chinsurah", "Fatehabad", "Rajauri", "Yogi Nagar", "Thuraipakkam", "Kottur", "Churu", "Chetla", "Lakshadweep", "Thiruninravur", "Purnia", "Gadchiroli", "Kanniyakumari", "Gobindapur Bhangar", "Pali Naka", "Ammuguda", "Defence Colony", "Kodarma", "Balaji Mandir", "Banda", "Hojai", "Kavi Nirav Lane", "New Usmanpur", "Leh Ladakh", "Mudichur", "Palghar", "Sithalapakkam", "Cooch Behar", "Santhome", "Phek", "Baranagar", "Sharfabad", "Jharsuguda", "Alaknanda", "Kondagaon", "Rasulpur Nawada", "Ernakulam", "Alirajpur", "Kalyani", "Narsingi", "Najafgarh", "Chata Kalikapur", "Kachiguda", "Vasant Vihar", "Nawanshahr", "Shakti Nagar", "Cherlapally", "Tardeo", "Papum Pare", "Shivaji Talav", "Pozhichalur", "Peerzadiguda", "Marol", "Balrampur", "Gondalpara", "Nithari", "Ramnagar", "Babughat", "Purulia", "Sainikpuri", "BBD Bagh", "Sarojini Nagar", "Ramanathapuram", "Munirka", "Komaram Bheem Asifabad", "Champdani", "Jayprakash Nagar", "Dahisar", "Godda", "Govandi", "Tiruvannamalai", "Hazipur", "Mahalaxmi", "Avadi", "Gijhaur", "Annanur", "West Mambalam", "Sultanpur", "Murshidabad", "Nagarkurnool", "Badichowdi", "Nawada", "Budaun", "Sitamarhi", "Birati", "Senapati", "Chrompet", "Versova", "Karwan", "Vivek Vihar", "Tashilanagar", "Burhanpur", "Kolkata", "Pandurangwadi", "Kammanahalli", "Sheohar", "Altamount Road", "Jhundpura", "Rupnagar", "Chikmagalur", "Sahyadri Nagar", "Jalpaiguri", "Balrampur", "Borivali West", "Vile Parle", "Shivamogga", "Assam", "Kadamtala", "Mogappair", "Haora", "Choolai", "Nungambakkam", "Mahe", "Nagali Sakpur", "Pophalwadi", "Rajendranagar", "Ranipet", "Saidapet", "Kalara", "Yadadri Bhuvanagiri", "Singrauli", "Dholpur", "Gorakhpur", "Domjur", "Wardha", "Kushaiguda", "Bommasandra", "Paharganj", "Chintal Basti", "Puzhuthivakkam", "Mahabubnagar", "Mandla", "Mahavir Nagar", "Moulivakkam", "Mathur", "Borabanda", "Chowringhee", "Dwarka", "Tatya Gharpure Marg", "Bulandshahr", "Dang", "Puthagaram", "Dhobitalao", "Bishanpura", "Bandra", "Palavakkam", "Dwarka", "Anna Nagar", "Rajiv Gandhi Nagar", "Farrukhabad", "Thiruneermalai", "Kasaiwada", "Udden Gadda", "Medchal", "Madipakkam", "Karkhana", "Vishwas Nagar", "Sepahijala", "Malleswaram", "Diu", "Dabri", "Ankurhati", "Horamavu", "Shenoy Nagar", "Hamirpur", "Chhajarsi", "Chakala", "Chikkadpally", "Christian Gaon", "Basi", "Kokrajhar", "Yavatmal", "Kamalgazi", "Hastinapuram", "Hingoli", "Bipra Noapara", "Jagruti Nagar", "Bilaspur", "Banaswadi", "Tiruverkadu", "Dahod", "Siang", "Hulimavu", "Ekbalpur", "Karol Bagh", "Mancherial", "Amroha", "Longding", "Thiruvallur", "Sindhi Colony", "Rohilapur", "Pet Basheerabad", "Mahipalpur", "Gadag", "Nabarangpur", "Khardaha", "Koliwada", "Erode", "Zunheboto", "Raipur Khadar", "Ulsoor", "Bundi", "Jharkhand", "Sanghi Nagar", "Belur", "Saligramam", "Meerpet", "Dagdi Chawl", "Cotton Green", "Kompally", "Girgaon", "Rampur", "Chengicherla", "RT Nagar", "Jalna", "Chamrail", "Bazarghat", "Kanyanagar", "Koombarwara", "Ekkaduthangal", "Bilaspur", "Nadia", "Debagarh",
  "United States USA", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "Canada", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon",
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City",
  "Mexico", "United Arab Emirates UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Jeddah", "Riyadh", "Qatar", "Doha", "Kuwait", "Oman", "Melbourne", "Bahrain", "Sydney", "Australia", "New Zealand", "England", "Wales", "Singapore", "Russia", "Moscow", "Saint Petersburg", "Berlin", "Zurich", "Geneva", "Tatarstan", "Krasnodar Krai", "Scotland", "Brisbane", "Perth", "Adelaide", "Canberra", "Auckland", "Wellington", "Christchurch", "Hamilton", "New Plymouth", "Greymouth", "Invercargill", "Gisborne", "Nelson", "Blenheim", "Richmond", "Tauranga", "Dunedin", "Napier", "Palmerston North", "Whangarei", "Hastings"
];

// Helper functions
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

const generateLocationContent = (city, serviceName) => {
  const { isInternational } = categorizeLocation(city);
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

const generateSEO = (city, serviceName) => {
  const { isInternational } = categorizeLocation(city);
  const locationSuffix = isInternational ? city : `${city}, India`;
  
  return {
    title: `${serviceName} in ${city} | GAG Lawyers - Expert Legal Services`,
    description: `Looking for ${serviceName.toLowerCase()} in ${locationSuffix}? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`,
    keywords: `${serviceName.toLowerCase()} ${city}, lawyers in ${city}, advocates in ${city}, legal services ${city}, ${generateSlug(serviceName)} ${city}`,
    h1: `${serviceName} in ${city}`
  };
};

// Main generation function
const generateAllLocationPages = async () => {
  try {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 LOCATION PAGES GENERATOR - 25 Services × 1702 Locations');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await connectDB();

    console.log('📊 Configuration:');
    console.log(`   Services: ${services25.length}`);
    console.log(`   Locations: ${locations1702.length}`);
    console.log(`   Total pages to generate: ${services25.length * locations1702.length}\n`);

    // Step 1: Ensure all services exist in database
    console.log('📝 Step 1: Processing services...\n');
    const serviceMap = new Map();

    for (const serviceName of services25) {
      let service = await Service.findOne({ name: serviceName });
      
      if (!service) {
        service = await Service.create({
          name: serviceName,
          title: serviceName,
          slug: generateSlug(serviceName),
          category: 'litigation',
          shortDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers.`,
          longDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
          description: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
          iconName: 'Scale'
        });
        console.log(`   ✅ Created service: ${serviceName}`);
      } else {
        console.log(`   ✓ Found service: ${serviceName} (${service.name})`);
      }
      
      serviceMap.set(serviceName, service._id);
    }

    console.log(`\n✅ ${serviceMap.size} services ready\n`);

    // Step 2: Check existing location pages
    const existingCount = await LocationPage.countDocuments();
    console.log(`📋 Existing location pages in database: ${existingCount}\n`);

    if (existingCount > 0) {
      console.log('⚠️  WARNING: Location pages already exist!');
      console.log('   This script will skip duplicates based on slug.');
      console.log('   To delete all and regenerate, uncomment the delete line in code.\n');
      
      // Uncomment to delete all existing pages
      // await LocationPage.deleteMany();
      // console.log('✅ Deleted all existing location pages\n');
    }

    // Step 3: Generate location pages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔨 Step 2: Generating location pages...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let totalCreated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    const BATCH_SIZE = 100;
    const locationPages = [];

    // Build a set of existing slugs for faster lookup
    const existingSlugs = new Set();
    const existing = await LocationPage.find({}).select('slug');
    existing.forEach(page => existingSlugs.add(page.slug));

    console.log(`   ℹ️  Found ${existingSlugs.size} existing slugs to skip\n`);

    // Generate all pages
    for (const serviceName of services25) {
      const serviceId = serviceMap.get(serviceName);
      console.log(`   📍 Processing: ${serviceName}`);
      
      for (const city of locations1702) {
        const slug = generateSlug(`${serviceName}-${city}`);
        
        // Skip if already exists
        if (existingSlugs.has(slug)) {
          totalSkipped++;
          continue;
        }

        const content = generateLocationContent(city, serviceName);
        const seo = generateSEO(city, serviceName);

        locationPages.push({
          service: serviceId,
          serviceName: serviceName,
          city: city,
          slug: slug,
          content,
          seo,
          isActive: true,
          views: 0
        });

        // Insert in batches
        if (locationPages.length >= BATCH_SIZE) {
          try {
            await LocationPage.insertMany(locationPages, { ordered: false });
            totalCreated += locationPages.length;
            process.stdout.write(`\r   ✅ Progress: ${totalCreated} pages created (${totalSkipped} skipped)`);
            locationPages.length = 0;
          } catch (error) {
            if (error.code === 11000) {
              totalSkipped += locationPages.length;
            } else {
              totalErrors += locationPages.length;
              console.error(`\n   ⚠️  Batch error:`, error.message);
            }
            locationPages.length = 0;
          }
        }
      }
    }

    // Insert remaining pages
    if (locationPages.length > 0) {
      try {
        await LocationPage.insertMany(locationPages, { ordered: false });
        totalCreated += locationPages.length;
      } catch (error) {
        if (error.code === 11000) {
          totalSkipped += locationPages.length;
        } else {
          totalErrors += locationPages.length;
        }
      }
    }

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ GENERATION COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📊 SUMMARY:');
    console.log(`   ✅ Created: ${totalCreated} pages`);
    console.log(`   ⏭️  Skipped: ${totalSkipped} pages (already exist)`);
    if (totalErrors > 0) {
      console.log(`   ❌ Errors: ${totalErrors} pages`);
    }
    console.log(`\n   📍 Total locations: ${locations1702.length}`);
    console.log(`   🔧 Total services: ${services25.length}`);
    console.log(`   📈 Total in database: ${await LocationPage.countDocuments()}`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔗 SAMPLE PAGES:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const samples = await LocationPage.find().limit(10);
    samples.forEach(page => {
      console.log(`   /${page.slug}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 NEXT STEPS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('   1. View pages in admin panel');
    console.log('   2. Check sitemap: http://localhost:5000/sitemap.xml');
    console.log('   3. Visit sample pages to verify content');
    console.log('   4. Use bulk toggle in admin to manage active status\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
};

// Run the generator
generateAllLocationPages();
