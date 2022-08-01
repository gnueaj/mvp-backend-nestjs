import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/modules/auth/auth.service';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class MagicLoginConfigService {
	constructor(
		private configService: ConfigService,
		private mailService: MailService,
		private authService: AuthService,
	) {}

	createMagicLoginOptions() {
		return {
			secret: this.configService.get<string>('MAGIC_SECRET'),
			callbackUrl: 'auth/login/callback',
			sendMagicLink: async (destination, href) => {
				await this.mailService.sendLoginConfirmation(destination, href);
			},
			verify: (payload, callback) => {
				this.authService
					.magicLoginValidation(payload.destination)
					.then((user) => {
						callback(null, user, 'optional');
					})
					.catch((e) => {
						callback(e);
					});
			},
		};
	}
}
