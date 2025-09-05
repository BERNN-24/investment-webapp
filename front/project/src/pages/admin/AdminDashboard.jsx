import React , {useState , useEffect } from "react";
// HOOKS
import { useAuth } from "../../hooks/Auth_Provider";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import { DashboardNavbar } from "../../components/dashboardComponent/DashboardNavbar";
import { DashboardLayout } from "../../components/adminComponent/DashboardLayout";
// ICONS
import { MdAdminPanelSettings, MdAccountBalanceWallet, MdCurrencyExchange, MdPendingActions} from "../../components/Icons";

let layoutInfo = [
  {
    icon: <MdAdminPanelSettings className="w-14 h-14" />,
    layout: "ADMIN SETTINGS",
    url: "adminSettings",
    color: "bg-gradient-to-br from-purple-500 to-indigo-600", 
  },
  {
    icon: <MdAccountBalanceWallet className="w-14 h-14" />,
    layout: "BALANCES",
    url: "editBalance",
    color: "bg-gradient-to-br from-green-400 to-green-600", 
  },
  {
    icon: <MdCurrencyExchange className="w-14 h-14" />,
    layout: "TRANSACTIONS",
    url: "allTransactions",
    color: "bg-gradient-to-br from-blue-400 to-blue-600", 
  },
  {
    icon: <MdPendingActions className="w-14 h-14" />,
    layout: "PENDING REQUESTS",
    url: "editRequests",
    color: "bg-gradient-to-br from-orange-400 to-red-500", 
  },
];


export function AdminDashboard (){
    const {user} = useAuth();
    const [isLoading , setLoading] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);

    useEffect(()=>{
       const timer = setTimeout(()=>{
        setLoading(false);
       }, 1500);
       return () => clearTimeout(timer);
    }, []);
    

     return (
    <div className="min-h-screen bg-gradient-to-br from-[#7F00FF] to-[#E100FF]">
      {/* Navbar */}
      <div>
        <DashboardNavbar username={user.display_name} avatar={user.avatarurl} />
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center text-red-600 font-semibold mt-6">
          {errorMessage}
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && (
        <div className="text-center mt-10 px-6">
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Admin Dashboard
          </h1>
          <p className="text-[#6B7280] mt-2 max-w-2xl mx-auto">
            Welcome to the admin dashboard. Here you can manage user balances,
            requests, and view all transactions.
          </p>

          {/* Dashboard Cards */}
          <div className="mx-auto mt-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {layoutInfo.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md border border-[#E2D6F3] p-8 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D6B4FC]"
                >
                  <DashboardLayout
                    icon={data.icon}
                    layout={data.layout}
                    navigation={data.url}
                    color={data.color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}



