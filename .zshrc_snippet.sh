# Add this to your ~/.zshrc to get a one-line deploy command
# Run: echo "source ~/Desktop/Work/adamstephenson-art/.zshrc_snippet.sh" >> ~/.zshrc

deploy() {
  local msg="${1:-update}"
  git -C ~/Desktop/Work/adamstephenson-art add . && \
  git -C ~/Desktop/Work/adamstephenson-art commit -m "$msg" && \
  git -C ~/Desktop/Work/adamstephenson-art push origin main && \
  echo "✓ Deployed: $msg"
}
