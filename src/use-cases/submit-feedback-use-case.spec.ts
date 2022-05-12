import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'new comment',
        screenshot: 'data:image/png;base64test.png',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should bot be able to submit feedback without type ', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'new comment',
        screenshot: 'data:image/png;base64test.png',
      })
    ).rejects.toThrow();
  });

  it('should bot be able to submit feedback without comment ', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64test.png',
      })
    ).rejects.toThrow();
  });

  it('should bot be able to submit feedback with invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'new comment',
        screenshot: 'asdasd',
      })
    ).rejects.toThrow();
  });
});
