function LoginButton() {
    return {
      view: () => (
        <>
          <div className="px-6">
            <div className="flex flex-col md:flex-row justify-center md:space-x-4"> {/* Added justify-center for alignment and space-x-4 for space between buttons on medium screens */}
              <div className='wrapper mb-4 md:mb-0'> {/* Added mb-4 for space between buttons on small screens, removed on medium screens */}
                <div role='button' className='retro-btn'>
                  <a className='btn px-4'> {/* Added horizontal padding here */}
                    <span className='btn-inner'>
                      <span className='content-wrapper'>
                        <span className='btn-content'>
                          <span className='btn-content-inner'>Sign in with Github</span> {/* Text added here */}
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
  