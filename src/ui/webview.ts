export function getWebviewContent(explanation: string): string {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
          color: #222;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 700px;
          margin: 40px auto 0 auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 32px 28px 24px 28px;
        }
        h2 {
          color: #2b6cb0;
          margin-top: 0;
        }
        .footer {
          margin-top: 32px;
          font-size: 0.95em;
          color: #888;
          text-align: right;
        }
        .brand {
          font-weight: bold;
          color: #2b6cb0;
        }
      </style>
    </head>
    <body>
      <div class='container'>
        <h2>AI Error Explanation</h2>
        <div>${explanation}</div>
        <div class='footer'>
          Powered by <span class='brand'>[Your Name]</span> at <span class='brand'>[Your Company]</span>
        </div>
      </div>
    </body>
  </html>`;
}
