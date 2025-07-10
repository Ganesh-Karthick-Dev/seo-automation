"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx"
import { Input } from "../../components/ui/input.jsx"
import { Label } from "../../components/ui/label.jsx"
import { Badge } from "../../components/ui/badge.jsx"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu.jsx"
import { Loader2, Building2, Globe, Mail, Phone, MapPin, Clock, Tag, CheckCircle, AlertCircle, ChevronDown, Lock } from "lucide-react"
import { saveAs } from "file-saver"


const categories = [
  { value: "0", label: "[Top]" },
  { value: "1", label: "|___Arts" },
  { value: "17", label: "|   |___Animation" },
  { value: "74", label: "|   |   |___Animated Graphics" },
  { value: "75", label: "|   |   |___Animation Art Galleries" },
  { value: "72", label: "|   |   |___Animation Companies" },
  { value: "68", label: "|   |   |___Anime" },
  { value: "76", label: "|   |   |___Artists" },
  { value: "77", label: "|   |   |___Audio" },
  { value: "78", label: "|   |   |___Awards" },
  { value: "69", label: "|   |   |___Cartoons" },
  { value: "79", label: "|   |   |___Chats and Forums" },
  { value: "80", label: "|   |   |___Collectibles" },
  { value: "81", label: "|   |   |___Computer" },
  { value: "82", label: "|   |   |___Contests" },
  { value: "83", label: "|   |   |___DVD" },
  { value: "84", label: "|   |   |___Experimental" },
  { value: "85", label: "|   |   |___Festivals" },
  { value: "70", label: "|   |   |___Movies" },
  { value: "86", label: "|   |   |___News and Media" },
  { value: "87", label: "|   |   |___Organizations" },
  { value: "88", label: "|   |   |___Puppetry" },
  { value: "89", label: "|   |   |___Shopping" },
  { value: "90", label: "|   |   |___Stop-Motion" },
  { value: "73", label: "|   |   |___Studios" },
  { value: "91", label: "|   |   |___Training" },
  { value: "92", label: "|   |   |___Video Games" },
  { value: "71", label: "|   |   |___Voice Actors" },
  { value: "93", label: "|   |   |___Web" },
  { value: "94", label: "|   |   |___Web Rings" },
  { value: "95", label: "|   |   |___Writers" },
  { value: "18", label: "|   |___Antiques" },
  { value: "100", label: "|   |   |___Appliances" },
  { value: "96", label: "|   |   |___Auctions" },
  { value: "101", label: "|   |   |___Autos" },
  { value: "102", label: "|   |   |___Bicycles" },
  { value: "103", label: "|   |   |___Books" },
  { value: "104", label: "|   |   |___Bottles" },
  { value: "105", label: "|   |   |___Cameras" },
  { value: "106", label: "|   |   |___Cash Registers" },
  { value: "107", label: "|   |   |___Ceramics and Pottery" },
  { value: "108", label: "|   |   |___Clocks and Watches" },
  { value: "109", label: "|   |   |___Clothing" },
  { value: "110", label: "|   |   |___Coins" },
  { value: "97", label: "|   |   |___Directories" },
  { value: "111", label: "|   |   |___Dolls" },
  { value: "112", label: "|   |   |___Farm and Ranch Equipment" },
  { value: "113", label: "|   |   |___Fine China" },
  { value: "114", label: "|   |   |___Furniture" },
  { value: "115", label: "|   |   |___Glassware" },
  { value: "116", label: "|   |   |___Kitchenware" },
  { value: "117", label: "|   |   |___Lighting" },
  { value: "118", label: "|   |   |___Maps" },
  { value: "119", label: "|   |   |___Medical and Scientific" },
  { value: "120", label: "|   |   |___Phonographs" },
  { value: "122", label: "|   |   |___Posters" },
  { value: "98", label: "|   |   |___Publications" },
  { value: "123", label: "|   |   |___Radio" },
  { value: "124", label: "|   |   |___Rugs" },
  { value: "125", label: "|   |   |___Sewing Items" },
  { value: "99", label: "|   |   |___Shows and Events" },
  { value: "126", label: "|   |   |___Silver and Flatware" },
  { value: "127", label: "|   |   |___Stamps" },
  { value: "128", label: "|   |   |___Telephones and Telegraphs" },
  { value: "129", label: "|   |   |___Toilets" },
  { value: "130", label: "|   |   |___Tools" },
  { value: "131", label: "|   |   |___Toys" },
  { value: "132", label: "|   |   |___Tractors" },
  { value: "133", label: "|   |   |___Trade Cards" },
  { value: "134", label: "|   |   |___Typewriters" },
  { value: "135", label: "|   |   |___US Civil War" },
  { value: "136", label: "|   |   |___Writing Instruments" },
  { value: "2", label: "|___Business" },
  { value: "572", label: "|   |___Accounting" },
  { value: "573", label: "|   |___Advertising and Marketing" },
  { value: "574", label: "|   |___Agriculture and Forestry" },
  { value: "575", label: "|   |___Arts and Entertainment" },
  { value: "576", label: "|   |___Automotive" },
  { value: "577", label: "|   |___Biotechnology and Pharmaceuticals" },
  { value: "578", label: "|   |___Business Services" },
  { value: "579", label: "|   |___Chemicals" },
  { value: "580", label: "|   |___Construction and Maintenance" },
  { value: "581", label: "|   |___Consumer Goods and Services" },
  { value: "582", label: "|   |___E-Commerce" },
  { value: "583", label: "|   |___Electronics and Electrical" },
  { value: "584", label: "|   |___Employment" },
  { value: "585", label: "|   |___Energy" },
  { value: "586", label: "|   |___Financial Services" },
  { value: "587", label: "|   |___Food and Related Products" },
  { value: "588", label: "|   |___Healthcare" },
  { value: "589", label: "|   |___Hospitality" },
  { value: "590", label: "|   |___Human Resources" },
  { value: "591", label: "|   |___Industrial Goods and Services" },
  { value: "592", label: "|   |___Information Technology" },
  { value: "593", label: "|   |___Insurance" },
  { value: "594", label: "|   |___Investing" },
  { value: "595", label: "|   |___Management" },
  { value: "596", label: "|   |___Materials" },
  { value: "597", label: "|   |___Mining and Drilling" },
  { value: "598", label: "|   |___News and Media" },
  { value: "599", label: "|   |___Opportunities" },
  { value: "600", label: "|   |___Publishing and Printing" },
  { value: "601", label: "|   |___Real Estate" },
  { value: "602", label: "|   |___Small Business" },
  { value: "603", label: "|   |___Telecommunications" },
  { value: "604", label: "|   |___Textiles and Nonwovens" },
  { value: "605", label: "|   |___Transportation and Logistics" },
  { value: "3", label: "|___Computers" },
  { value: "606", label: "|   |___Algorithms" },
  { value: "607", label: "|   |___Artificial Intelligence" },
  { value: "608", label: "|   |___Bulletin Board Systems" },
  { value: "609", label: "|   |___CAD and CAM" },
  { value: "610", label: "|   |___Chats and Forums" },
  { value: "611", label: "|   |___Companies" },
  { value: "612", label: "|   |___Computer Science" },
  { value: "613", label: "|   |___Consultants" },
  { value: "614", label: "|   |___Data Communications" },
  { value: "615", label: "|   |___Data Formats" },
  { value: "616", label: "|   |___Databases" },
  { value: "617", label: "|   |___Distributed Computing" },
  { value: "618", label: "|   |___E-Books" },
  { value: "619", label: "|   |___Education" },
  { value: "620", label: "|   |___Emulators" },
  { value: "621", label: "|   |___Graphics" },
  { value: "622", label: "|   |___Hacking" },
  { value: "623", label: "|   |___Hardware" },
  { value: "624", label: "|   |___History" },
  { value: "625", label: "|   |___Human-Computer Interaction" },
  { value: "626", label: "|   |___Internet" },
  { value: "627", label: "|   |___Intranet" },
  { value: "628", label: "|   |___Mobile Computing" },
  { value: "629", label: "|   |___Multimedia" },
  { value: "630", label: "|   |___News and Media" },
  { value: "631", label: "|   |___Open Source" },
  { value: "632", label: "|   |___Organizations" },
  { value: "633", label: "|   |___Parallel Computing" },
  { value: "634", label: "|   |___Performance and Capacity" },
  { value: "635", label: "|   |___Programming" },
  { value: "636", label: "|   |___Robotics" },
  { value: "637", label: "|   |___Security" },
  { value: "638", label: "|   |___Shopping" },
  { value: "639", label: "|   |___Software" },
  { value: "640", label: "|   |___Speech Technology" },
  { value: "641", label: "|   |___Standards" },
  { value: "642", label: "|   |___Systems" },
  { value: "643", label: "|   |___Usenet" },
  { value: "644", label: "|   |___Virtual Reality" },
  { value: "4", label: "|___Games" },
  { value: "645", label: "|   |___Board Games" },
  { value: "646", label: "|   |___Card Games" },
  { value: "647", label: "|   |___Coin-Op" },
  { value: "648", label: "|   |___Dice" },
  { value: "649", label: "|   |___Gambling" },
  { value: "650", label: "|   |___Game Studies" },
  { value: "651", label: "|   |___Hand and Finger Games" },
  { value: "652", label: "|   |___Miniatures" },
  { value: "653", label: "|   |___Online" },
  { value: "654", label: "|   |___Party Games" },
  { value: "655", label: "|   |___Puzzles" },
  { value: "656", label: "|   |___Role Playing" },
  { value: "657", label: "|   |___Trading Card Games" },
  { value: "658", label: "|   |___Video Games" },
  { value: "5", label: "|___Health" },
  { value: "659", label: "|   |___Addictions" },
  { value: "660", label: "|   |___Alternative" },
  { value: "661", label: "|   |___Animal" },
  { value: "662", label: "|   |___Beauty" },
  { value: "663", label: "|   |___Child Health" },
  { value: "664", label: "|   |___Conditions and Diseases" },
  { value: "665", label: "|   |___Dentistry" },
  { value: "666", label: "|   |___Disabilities" },
  { value: "667", label: "|   |___Education" },
  { value: "668", label: "|   |___Emergency Services" },
  { value: "669", label: "|   |___Environmental Health" },
  { value: "670", label: "|   |___Fitness" },
  { value: "671", label: "|   |___Home Health" },
  { value: "672", label: "|   |___Medicine" },
  { value: "673", label: "|   |___Mental Health" },
  { value: "674", label: "|   |___Nursing" },
  { value: "675", label: "|   |___Nutrition" },
  { value: "676", label: "|   |___Occupational Health and Safety" },
  { value: "677", label: "|   |___Pharmacy" },
  { value: "678", label: "|   |___Professions" },
  { value: "679", label: "|   |___Public Health and Safety" },
  { value: "680", label: "|   |___Reproductive Health" },
  { value: "681", label: "|   |___Resources" },
  { value: "682", label: "|   |___Senior Health" },
  { value: "683", label: "|   |___Services" },
  { value: "684", label: "|   |___Support Groups" },
  { value: "685", label: "|   |___Teen Health" },
  { value: "686", label: "|   |___Weight Loss" },
  { value: "687", label: "|   |___Women's Health" },
  { value: "6", label: "|___Home" },
  { value: "688", label: "|   |___Apartment Living" },
  { value: "689", label: "|   |___Consumer Information" },
  { value: "690", label: "|   |___Cooking" },
  { value: "691", label: "|   |___Do-It-Yourself" },
  { value: "692", label: "|   |___Emergency Preparation" },
  { value: "693", label: "|   |___Family" },
  { value: "694", label: "|   |___Gardening" },
  { value: "695", label: "|   |___Homemaking" },
  { value: "696", label: "|   |___Homeowners" },
  { value: "697", label: "|   |___Moving and Relocating" },
  { value: "698", label: "|   |___Personal Finance" },
  { value: "699", label: "|   |___Personal Organization" },
  { value: "700", label: "|   |___Rural Living" },
  { value: "701", label: "|   |___Urban Living" },
  { value: "7", label: "|___Kids and Teens" },
  { value: "702", label: "|   |___Arts" },
  { value: "703", label: "|   |___Computers" },
  { value: "704", label: "|   |___Entertainment" },
  { value: "705", label: "|   |___Games" },
  { value: "706", label: "|   |___Health" },
  { value: "707", label: "|   |___International" },
  { value: "708", label: "|   |___News" },
  { value: "709", label: "|   |___People and Society" },
  { value: "710", label: "|   |___Pre-School" },
  { value: "711", label: "|   |___School Time" },
  { value: "712", label: "|   |___Sports" },
  { value: "713", label: "|   |___Teen Life" },
  { value: "8", label: "|___News" },
  { value: "714", label: "|   |___Alternative" },
  { value: "715", label: "|   |___Analysis and Opinion" },
  { value: "716", label: "|   |___Breaking News" },
  { value: "717", label: "|   |___By Region" },
  { value: "718", label: "|   |___By Subject" },
  { value: "719", label: "|   |___Chats and Forums" },
  { value: "720", label: "|   |___Current Events" },
  { value: "721", label: "|   |___Directories" },
  { value: "722", label: "|   |___Magazines and E-zines" },
  { value: "723", label: "|   |___Media" },
  { value: "724", label: "|   |___Newspapers" },
  { value: "725", label: "|   |___Online Archives" },
  { value: "726", label: "|   |___Personalized News" },
  { value: "727", label: "|   |___Weather" },
  { value: "9", label: "|___Recreation" },
  { value: "728", label: "|   |___Antiques" },
  { value: "729", label: "|   |___Audio" },
  { value: "730", label: "|   |___Autos" },
  { value: "731", label: "|   |___Aviation" },
  { value: "732", label: "|   |___Birding" },
  { value: "733", label: "|   |___Boating" },
  { value: "734", label: "|   |___Climbing" },
  { value: "735", label: "|   |___Collecting" },
  { value: "736", label: "|   |___Food" },
  { value: "737", label: "|   |___Games" },
  { value: "738", label: "|   |___Guns" },
  { value: "739", label: "|   |___Humor" },
  { value: "740", label: "|   |___Kites" },
  { value: "741", label: "|   |___Knots" },
  { value: "742", label: "|   |___Living History" },
  { value: "743", label: "|   |___Models" },
  { value: "744", label: "|   |___Motorcycles" },
  { value: "745", label: "|   |___Nudism" },
  { value: "746", label: "|   |___Outdoors" },
  { value: "747", label: "|   |___Parties" },
  { value: "748", label: "|   |___Pets" },
  { value: "749", label: "|   |___Radio" },
  { value: "750", label: "|   |___Roads and Highways" },
  { value: "751", label: "|   |___Scouting" },
  { value: "752", label: "|   |___Theme Parks" },
  { value: "753", label: "|   |___Trains and Railroads" },
  { value: "754", label: "|   |___Travel" },
  { value: "755", label: "|   |___Woodworking" },
  { value: "10", label: "|___Reference" },
  { value: "756", label: "|   |___Almanacs" },
  { value: "757", label: "|   |___Archives" },
  { value: "758", label: "|   |___Ask an Expert" },
  { value: "759", label: "|   |___Atlases" },
  { value: "760", label: "|   |___Bibliographies" },
  { value: "761", label: "|   |___Biographies" },
  { value: "762", label: "|   |___Calendars and Dates" },
  { value: "763", label: "|   |___Dictionaries" },
  { value: "764", label: "|   |___Directories" },
  { value: "765", label: "|   |___Education" },
  { value: "766", label: "|   |___Encyclopedias" },
  { value: "767", label: "|   |___Etiquette" },
  { value: "768", label: "|   |___Facts" },
  { value: "769", label: "|   |___Flags" },
  { value: "770", label: "|   |___Forms" },
  { value: "771", label: "|   |___Genealogy" },
  { value: "772", label: "|   |___Geographic Names" },
  { value: "773", label: "|   |___Libraries" },
  { value: "774", label: "|   |___Maps" },
  { value: "775", label: "|   |___Museums" },
  { value: "776", label: "|   |___Phone Numbers" },
  { value: "777", label: "|   |___Quotations" },
  { value: "778", label: "|   |___Standards" },
  { value: "779", label: "|   |___Statistics" },
  { value: "780", label: "|   |___Style Guides" },
  { value: "781", label: "|   |___Thesauri" },
  { value: "782", label: "|   |___Time" },
  { value: "783", label: "|   |___Weights and Measures" },
  { value: "11", label: "|___Regional" },
  { value: "784", label: "|   |___Africa" },
  { value: "785", label: "|   |___Antarctica" },
  { value: "786", label: "|   |___Arctic" },
  { value: "787", label: "|   |___Asia" },
  { value: "788", label: "|   |___Caribbean" },
  { value: "789", label: "|   |___Central America" },
  { value: "790", label: "|   |___Europe" },
  { value: "791", label: "|   |___Middle East" },
  { value: "792", label: "|   |___North America" },
  { value: "793", label: "|   |___Oceania" },
  { value: "794", label: "|   |___Polar Regions" },
  { value: "795", label: "|   |___South America" },
  { value: "12", label: "|___Science" },
  { value: "796", label: "|   |___Agriculture" },
  { value: "797", label: "|   |___Anomalies and Alternative Science" },
  { value: "798", label: "|   |___Astronomy" },
  { value: "799", label: "|   |___Biology" },
  { value: "800", label: "|   |___Chemistry" },
  { value: "801", label: "|   |___Earth Sciences" },
  { value: "802", label: "|   |___Environment" },
  { value: "803", label: "|   |___Instruments and Supplies" },
  { value: "804", label: "|   |___Math" },
  { value: "805", label: "|   |___Methods and Techniques" },
  { value: "806", label: "|   |___Museums" },
  { value: "807", label: "|   |___Physics" },
  { value: "808", label: "|   |___Publications" },
  { value: "809", label: "|   |___Reference" },
  { value: "810", label: "|   |___Social Sciences" },
  { value: "811", label: "|   |___Technology" },
  { value: "13", label: "|___Shopping" },
  { value: "812", label: "|   |___Antiques and Collectibles" },
  { value: "813", label: "|   |___Auctions" },
  { value: "814", label: "|   |___Automotive" },
  { value: "815", label: "|   |___Books" },
  { value: "816", label: "|   |___Children" },
  { value: "817", label: "|   |___Classifieds" },
  { value: "818", label: "|   |___Clothing" },
  { value: "819", label: "|   |___Computers" },
  { value: "820", label: "|   |___Consumer Electronics" },
  { value: "821", label: "|   |___Crafts" },
  { value: "822", label: "|   |___Death Care" },
  { value: "823", label: "|   |___Entertainment" },
  { value: "824", label: "|   |___Ethnic and Regional" },
  { value: "825", label: "|   |___Flowers" },
  { value: "826", label: "|   |___Food" },
  { value: "827", label: "|   |___General Merchandise" },
  { value: "828", label: "|   |___Gifts" },
  { value: "829", label: "|   |___Health" },
  { value: "830", label: "|   |___Home and Garden" },
  { value: "831", label: "|   |___Jewelry" },
  { value: "832", label: "|   |___Music" },
  { value: "833", label: "|   |___Office Products" },
  { value: "834", label: "|   |___Photography" },
  { value: "835", label: "|   |___Publications" },
  { value: "836", label: "|   |___Recreation" },
  { value: "837", label: "|   |___Religion and Spirituality" },
  { value: "838", label: "|   |___Sports" },
  { value: "839", label: "|   |___Tobacco" },
  { value: "840", label: "|   |___Tools" },
  { value: "841", label: "|   |___Toys and Games" },
  { value: "842", label: "|   |___Travel" },
  { value: "843", label: "|   |___Vehicles" },
  { value: "844", label: "|   |___Visual Arts" },
  { value: "845", label: "|   |___Weddings" },
  { value: "14", label: "|___Society" },
  { value: "846", label: "|   |___Activism" },
  { value: "847", label: "|   |___Crime" },
  { value: "848", label: "|   |___Death" },
  { value: "849", label: "|   |___Disabled" },
  { value: "850", label: "|   |___Ethnicity" },
  { value: "851", label: "|   |___Folklore" },
  { value: "852", label: "|   |___Future" },
  { value: "853", label: "|   |___Gay, Lesbian, and Bisexual" },
  { value: "854", label: "|   |___Genealogy" },
  { value: "855", label: "|   |___Government" },
  { value: "856", label: "|   |___History" },
  { value: "857", label: "|   |___Holidays" },
  { value: "858", label: "|   |___Issues" },
  { value: "859", label: "|   |___Law" },
  { value: "860", label: "|   |___Military" },
  { value: "861", label: "|   |___Organizations" },
  { value: "862", label: "|   |___People" },
  { value: "863", label: "|   |___Philosophy" },
  { value: "864", label: "|   |___Politics" },
  { value: "865", label: "|   |___Relationships" },
  { value: "866", label: "|   |___Religion and Spirituality" },
  { value: "867", label: "|   |___Sexuality" },
  { value: "868", label: "|   |___Subcultures" },
  { value: "869", label: "|   |___Support Groups" },
  { value: "870", label: "|   |___Transgendered" },
  { value: "871", label: "|   |___Work" },
  { value: "15", label: "|___Sports" },
  { value: "872", label: "|   |___Baseball" },
  { value: "873", label: "|   |___Basketball" },
  { value: "874", label: "|   |___Bowling" },
  { value: "875", label: "|   |___Boxing" },
  { value: "876", label: "|   |___Cheerleading" },
  { value: "877", label: "|   |___Climbing" },
  { value: "878", label: "|   |___College and University" },
  { value: "879", label: "|   |___Combat Sports" },
  { value: "880", label: "|   |___Cycling" },
  { value: "881", label: "|   |___Disabled" },
  { value: "882", label: "|   |___Equestrian" },
  { value: "883", label: "|   |___Events" },
  { value: "884", label: "|   |___Extreme Sports" },
  { value: "885", label: "|   |___Fantasy" },
  { value: "886", label: "|   |___Football" },
  { value: "887", label: "|   |___Golf" },
  { value: "888", label: "|   |___Gymnastics" },
  { value: "889", label: "|   |___Hockey" },
  { value: "890", label: "|   |___Martial Arts" },
  { value: "891", label: "|   |___Motorsports" },
  { value: "892", label: "|   |___Multi-Sports" },
  { value: "893", label: "|   |___Olympics" },
  { value: "894", label: "|   |___Racquet Sports" },
  { value: "895", label: "|   |___Running" },
  { value: "896", label: "|   |___Skating" },
  { value: "897", label: "|   |___Soccer" },
  { value: "898", label: "|   |___Strength Sports" },
  { value: "899", label: "|   |___Swimming" },
  { value: "900", label: "|   |___Track and Field" },
  { value: "901", label: "|   |___Volleyball" },
  { value: "902", label: "|   |___Water Sports" },
  { value: "903", label: "|   |___Winter Sports" },
  { value: "904", label: "|   |___Women's Sports" },
  { value: "16", label: "|___World" },
  { value: "905", label: "|   |___Afrikaans" },
  { value: "906", label: "|   |___Arabic" },
  { value: "907", label: "|   |___Belarusian" },
  { value: "908", label: "|   |___Bulgarian" },
  { value: "909", label: "|   |___Catalan" },
  { value: "910", label: "|   |___Chinese Simplified" },
  { value: "911", label: "|   |___Chinese Traditional" },
  { value: "912", label: "|   |___Croatian" },
  { value: "913", label: "|   |___Czech" },
  { value: "914", label: "|   |___Danish" },
  { value: "915", label: "|   |___Dutch" },
  { value: "916", label: "|   |___Esperanto" },
  { value: "917", label: "|   |___Estonian" },
  { value: "918", label: "|   |___Finnish" },
  { value: "919", label: "|   |___French" },
  { value: "920", label: "|   |___German" },
  { value: "921", label: "|   |___Greek" },
  { value: "922", label: "|   |___Hebrew" },
  { value: "923", label: "|   |___Hungarian" },
  { value: "924", label: "|   |___Icelandic" },
  { value: "925", label: "|   |___Indonesian" },
  { value: "926", label: "|   |___Italian" },
  { value: "927", label: "|   |___Japanese" },
  { value: "928", label: "|   |___Korean" },
  { value: "929", label: "|   |___Latvian" },
  { value: "930", label: "|   |___Lithuanian" },
  { value: "931", label: "|   |___Norwegian" },
  { value: "932", label: "|   |___Polish" },
  { value: "933", label: "|   |___Portuguese" },
  { value: "934", label: "|   |___Romanian" },
  { value: "935", label: "|   |___Russian" },
  { value: "936", label: "|   |___Serbian" },
  { value: "937", label: "|   |___Slovak" },
  { value: "938", label: "|   |___Slovenian" },
  { value: "939", label: "|   |___Spanish" },
  { value: "940", label: "|   |___Swedish" },
  { value: "941", label: "|   |___Thai" },
  { value: "942", label: "|   |___Turkish" },
  { value: "943", label: "|   |___Ukrainian" },
  { value: "944", label: "|   |___Vietnamese" },
]
export default function BusinessForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    email: "",
    phone: "",
    categories: [], // Changed from category to categories
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    hours: "",
    keywords: [],
    documentUrl: "", // New field
    sheet1Url: "", // New field
    sheet2Url: "", // New field
  })

  const [keywordInput, setKeywordInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
console.log("formData",response);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleCategory = (category) => {
    setFormData((prev) => {
      const currentCategories = prev.categories || []
      const exists = currentCategories.find(c => c.value === category.value)
      
      if (exists) {
        return {
          ...prev,
          categories: currentCategories.filter(c => c.value !== category.value)
        }
      } else {
        return {
          ...prev,
          categories: [...currentCategories, category]
        }
      }
    })
  }

  const removeCategory = (categoryValue) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter(c => c.value !== categoryValue)
    }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }))
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create a modified version of formData with only category labels
      const submissionData = {
        ...formData,
        categories: formData.categories.map(cat => cat.label)
      }

      // Set immediate response
      setResponse({
        status: "initiated",
        message: "Your request has been initiated. Please check the document for updates."
      })

      // Make API call in background without waiting
      fetch("https://webnoxdigital.app.n8n.cloud/webhook/64c0df4c-3c91-4ba9-9965-1fd9ab656978", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while submitting the form")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to download the template file as a blob
  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("https://docs.google.com/spreadsheets/d/1hxAW5WJyUCCjmEKPozmnH63PL1Cqxm8ywvBSr_eKCps/export?format=xlsx", {
        method: "GET",
      })
      if (!response.ok) throw new Error("Failed to download template file")
      const blob = await response.blob()
      saveAs(blob, "Form_Automation_Template.xlsx")
    } catch (err) {
      alert("Could not download the template file. Please try again later.")
    }
  }

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.businessName.trim() !== "" &&
      formData.categories.length > 0 &&
      formData.description.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.keywords.length > 0 &&
      formData.documentUrl.trim() !== "" &&
      formData.sheet1Url.trim() !== "" &&
      formData.sheet2Url.trim() !== ""
    )
  }

  if (response) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-white w-full p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">Request Initiated!</CardTitle>
              <CardDescription className="text-blue-600">
                Your business data submission has been initiated. Please check the document for updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  setResponse(null)
                  setFormData({
                    businessName: "",
                    website: "",
                    email: "",
                    phone: "",
                    categories: [],
                    description: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    postalCode: "",
                    hours: "",
                    keywords: [],
                    documentUrl: "",
                    sheet1Url: "",
                    sheet2Url: "",
                  })
                }}
                className="w-full mt-4"
                variant="outline"
              >
                Submit Another Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white w-full p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Download Template Button */}
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            onClick={handleDownloadTemplate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow px-4 py-2 rounded"
          >
            Download Template File
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Information Form</h1>
          <p className="text-gray-600">Please fill in your business details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categories *</Label>
                  <div className="space-y-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Select Categories
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full max-h-[300px] overflow-y-auto">
                        {categories.map((category) => (
                          <DropdownMenuItem
                            key={category.value}
                            onSelect={(e) => {
                              e.preventDefault()
                              toggleCategory(category)
                            }}
                            className={`cursor-pointer ${
                              formData.categories.some(c => c.value === category.value) ? 'bg-blue-50' : ''
                            }`}
                          >
                            {category.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {formData.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.categories.map((category) => (
                          <Badge
                            key={category.value}
                            variant="secondary"
                            className="cursor-pointer hover:bg-red-100"
                            onClick={() => removeCategory(category.value)}
                          >
                            {category.label} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your business..."
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="contact@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91-9443067784"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hours">Business Hours</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="hours"
                      value={formData.hours}
                      onChange={(e) => handleInputChange("hours", e.target.value)}
                      placeholder="Mon–Sat: 9:00 AM–6:30 PM"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter street address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Country"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  Keywords & Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keywords">Add Keywords</Label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      placeholder="Enter keyword and press Enter"
                    />
                    <Button type="button" onClick={addKeyword} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
                {formData.keywords.length > 0 && (
                  <div>
                    <Label>Current Keywords:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-red-100"
                          onClick={() => removeKeyword(keyword)}
                        >
                          {keyword} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Document Links */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                Document & Sheet URLs
              </CardTitle>
              <CardDescription>
                Add links to your Google Document and Spreadsheets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="documentUrl">Document URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="documentUrl"
                    value={formData.documentUrl}
                    onChange={(e) => handleInputChange("documentUrl", e.target.value)}
                    placeholder="https://docs.google.com/document/d/..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sheet1Url">First Sheet URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="sheet1Url"
                    value={formData.sheet1Url}
                    onChange={(e) => handleInputChange("sheet1Url", e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sheet2Url">Second Sheet URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="sheet2Url"
                    value={formData.sheet2Url}
                    onChange={(e) => handleInputChange("sheet2Url", e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <h3 className="font-semibold mb-2 text-red-800">Error:</h3>
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : !isFormValid() ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Fill all required fields
                </>
              ) : (
                "Submit Business Information"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}