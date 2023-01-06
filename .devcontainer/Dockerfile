# FROM mcr.microsoft.com/vscode/devcontainers/javascript-node
FROM node:16.19-slim
FROM mcr.microsoft.com/playwright:focal
ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
RUN pnpm install-completion bash;
RUN apt-get -y install zsh gron jq vim;
RUN chsh -s $(which zsh);
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)";
RUN cd && curl https://raw.githubusercontent.com/mattrybin/dotfiles/master/.alias > .alias;
RUN cd && curl https://raw.githubusercontent.com/mattrybin/dotfiles/master/.zshrc > .zshrc;
RUN cd && echo "alias save=\"git add . && git commit -m 'save'\"" >> .alias;
RUN cd && echo "alias push=\"git add . && git commit -m 'save' && git push\"" >> .alias;
RUN cd && echo "alias clean=\"git clean -Xdf\"" >> .alias;