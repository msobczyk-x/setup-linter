import * as p from '@clack/prompts';

async function main() {
	console.clear();
	p.intro('Welcome to the CLI Tool');
	p.log.info('This tool will help you with various tasks.');
	// Simulate some processing
	// You can replace this with actual logic
	const loadingSpinner = p.spinner();
	loadingSpinner.start('Processing your request...');
	await new Promise((resolve) => setTimeout(resolve, 2000));
	loadingSpinner.stop('Done!');

	const group = await p.group(
		{
			name: () => p.text({ message: 'What is your name?' }),
			age: () => p.text({ message: 'What is your age?' }),
			color: ({ results }) =>
				p.multiselect({
					message: `What is your favorite color ${results.name}?`,
					options: [
						{ value: 'red', label: 'Red' },
						{ value: 'green', label: 'Green' },
						{ value: 'blue', label: 'Blue' },
					],
				}),
		},
		{
			// On Cancel callback that wraps the group
			// So if the user cancels one of the prompts in the group this function will be called
			onCancel: () => {
				p.cancel('Operation cancelled.');
				process.exit(0);
			},
		}
	);

	console.log(group.name, group.age, group.color);
	p.outro('Thank you for using the CLI Tool!');
	process.exit(0);
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
