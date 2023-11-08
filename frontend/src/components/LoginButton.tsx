function LoginButton() {
    return {
      view: () => (
        <>
          <div className="px-6">
            <div className="flex flex-col md:flex-row justify-center md:space-x-4">
              <div className='wrapper mb-4 md:mb-0'>
                <div role='button' className='retro-btn'>
                  <a className='btn px-4'>
                    <span className='btn-inner'>
                      <span className='content-wrapper'>
                        <span className='btn-content'>
                          <span className='btn-content-inner'>Sign in with Github</span>
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    };
  }
  
  export default LoginButton;
  