import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { AuthService } from '../auth/auth.service';

interface UserSession {
  step: 'login' | 'password' | 'authenticated';
  login?: string;
}

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private userSessions = new Map<number, UserSession>();
  private readonly logger = new Logger(TelegramService.name);

  constructor(private authService: AuthService) {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не указан в переменных окружения');
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.setupBot();
  }

  private setupBot() {
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (!text) return;

      try {
        if (text === '/start') {
          await this.handleStart(chatId);
        } else {
          await this.handleMessage(chatId, text);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Неизвестная ошибка';
        this.logger.error(`Ошибка при обработке сообщения: ${errorMessage}`);
        await this.bot.sendMessage(
          chatId,
          'Произошла ошибка. Попробуйте /start',
        );
      }
    });

    this.logger.log('Telegram бот запущен');
  }

  private async handleStart(chatId: number) {
    this.userSessions.set(chatId, { step: 'login' });
    await this.bot.sendMessage(
      chatId,
      'Добро пожаловать в систему авторизации блога!\nВведите логин:',
    );
  }

  private async handleMessage(chatId: number, text: string) {
    const session = this.userSessions.get(chatId);

    if (!session) {
      await this.bot.sendMessage(
        chatId,
        'Введите /start для начала авторизации',
      );
      return;
    }

    switch (session.step) {
      case 'login': {
        session.login = text;
        session.step = 'password';
        this.userSessions.set(chatId, session);
        await this.bot.sendMessage(chatId, 'Введите пароль:');
        break;
      }

      case 'password': {
        const isValid = this.authService.validateUser(session.login!, text);

        if (isValid) {
          const token = await this.authService.generateToken(session.login!);
          const frontendUrl =
            process.env.FRONTEND_URL ||
            'https://hakolr-dev-frontend.vercel.app/editing';
          const authUrl = `${frontendUrl}?access=${token}`;

          session.step = 'authenticated';
          this.userSessions.set(chatId, session);

          await this.bot.sendMessage(
            chatId,
            `✅ Авторизация успешна!\n\nВаша ссылка для доступа к панели редактирования:\n${authUrl}\n\n⚠️ Ссылка действительна 3 часа`,
          );
        } else {
          await this.bot.sendMessage(
            chatId,
            '❌ Неверный логин или пароль.\nВведите /start для повторной попытки',
          );
          this.userSessions.delete(chatId);
        }
        break;
      }

      case 'authenticated': {
        await this.bot.sendMessage(
          chatId,
          'Вы уже авторизованы. Введите /start для новой авторизации',
        );
        break;
      }
    }
  }
}
