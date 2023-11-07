import m from 'mithril';
import IDE from './IDE';
import LoginButton from './LoginButton';

function InfoAndIDE() {
	return {
		view: () => (
			<>
				<div className="flex flex-col items-center">
					<div className="flex items-center">
						<IDE />
					</div>
					<LoginButton />
				</div>
			</>
		),
	};
};

export default InfoAndIDE;
