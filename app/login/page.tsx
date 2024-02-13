import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
function Login() { 
  return (<>
  <Navbar/>
  <div className="bg-gray-400 tracking-wider flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-shop-background">
        <form className="tracking-wider flex  flex-col gap-5 max-w-xl w-full mx-auto p-8 rounded-md">
         <input
          type="text"
          placeholder="Username"
          className="placeholder-white p-2 tracking-wider bg-white/10 backdrop-blur-md border hover:bg-gray-800/40 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none flicker-effect"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="placeholder-white p-2 tracking-wider bg-white/10 backdrop-blur-md border hover:bg-gray-800/40 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none flicker-effect"
          required
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="p-3 bg-gray-600 text-sm tracking-widest text-white font-bold px-20 rounded-md transition-colors"
          >
            Sign In
          </button>
          <a href="/forgot-password" className="text-white text-base hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
    <div className="sticky " style={{  }}>
    <Footer/></div>
    </>
  );
}

export default Login;
