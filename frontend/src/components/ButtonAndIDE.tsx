import m from 'mithril';
import IDE from './IDE';
import LoginButtons from './LoginButtons';
import { activateCode } from '../logic/login';

const InfoAndIDE: m.Component = {
  oncreate: () => {
    // Ensure the DOM is fully ready before attempting to bind events
    requestAnimationFrame(() => {
      activateCode();
    });
  },
  view: () => (
    <>
      <div className="flex flex-col items-center w-120">
        <div className="flex items-center">
          <IDE />
        </div>
        <LoginButtons />
      </div>
    </>
  ),
};

export default InfoAndIDE;
