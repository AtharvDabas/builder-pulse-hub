// Contact service for handling phone calls and web integration
export class ContactService {
  
  // Enhanced phone calling with fallbacks
  static makeCall(phoneNumber: string, context?: string) {
    // Clean phone number
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Try multiple approaches for maximum compatibility
    const methods = [
      () => this.directCall(cleanNumber),
      () => this.webCallAPI(cleanNumber, context),
      () => this.fallbackCall(cleanNumber)
    ];
    
    // Try each method until one succeeds
    for (const method of methods) {
      try {
        if (method()) {
          console.log(`Call initiated to ${cleanNumber} via ${method.name}`);
          return true;
        }
      } catch (error) {
        console.warn(`${method.name} failed:`, error);
      }
    }
    
    // If all methods fail, show user options
    this.showCallOptions(cleanNumber, context);
    return false;
  }
  
  // Direct tel: link (works on most devices)
  private static directCall(phoneNumber: string): boolean {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${phoneNumber}`;
      return true;
    }
    return false;
  }
  
  // Web-based calling APIs (like WebRTC, CallKit integration)
  private static webCallAPI(phoneNumber: string, context?: string): boolean {
    // Check if device supports WebRTC
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Simulate WebRTC calling capability
      console.log(`WebRTC call to ${phoneNumber}`);
      
      // In production, integrate with services like:
      // - Twilio Voice SDK
      // - Agora Voice SDK  
      // - Azure Communication Services
      // - Google Meet API
      
      return this.simulateWebCall(phoneNumber, context);
    }
    return false;
  }
  
  // Simulate web-based calling
  private static simulateWebCall(phoneNumber: string, context?: string): boolean {
    const callWindow = window.open(
      '',
      'call-window',
      'width=400,height=600,toolbar=no,menubar=no,scrollbars=no'
    );
    
    if (callWindow) {
      callWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Making Call</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              margin: 0;
            }
            .call-interface {
              background: rgba(255,255,255,0.1);
              padding: 30px;
              border-radius: 15px;
              margin-top: 50px;
            }
            .phone-number { font-size: 24px; margin: 20px 0; }
            .status { color: #4ade80; font-weight: bold; }
            .context { margin-top: 15px; opacity: 0.9; }
            button {
              background: #ef4444;
              color: white;
              border: none;
              padding: 15px 30px;
              border-radius: 50px;
              font-size: 16px;
              cursor: pointer;
              margin-top: 20px;
            }
            button:hover { background: #dc2626; }
          </style>
        </head>
        <body>
          <div class="call-interface">
            <h2>📞 Connecting Call</h2>
            <div class="phone-number">${phoneNumber}</div>
            <div class="status">✅ Call Connected</div>
            ${context ? `<div class="context">Context: ${context}</div>` : ''}
            <button onclick="window.close()">End Call</button>
            <div style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
              This is a simulated call interface.<br>
              In production, this would connect via WebRTC or calling service.
            </div>
          </div>
        </body>
        </html>
      `);
      return true;
    }
    return false;
  }
  
  // Fallback method with user options
  private static fallbackCall(phoneNumber: string): boolean {
    // Try opening the default phone app with the number pre-filled
    if (navigator.userAgent.includes('Mobile')) {
      window.location.href = `tel:${phoneNumber}`;
      return true;
    }
    
    // For desktop, try other methods
    try {
      // Try to open a new tab with Google Voice or similar service
      window.open(`https://voice.google.com/u/0/calls?a=nc,%2B${phoneNumber.replace('+', '')}`, '_blank');
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Show call options when direct methods fail
  private static showCallOptions(phoneNumber: string, context?: string) {
    const options = [
      `📱 Call directly: ${phoneNumber}`,
      `💻 Open Google Voice`,
      `📋 Copy number to clipboard`,
      `📞 Open Skype`,
      `📱 Open WhatsApp`
    ];
    
    const choice = prompt(
      `Choose how to contact ${phoneNumber}:\n\n` +
      options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') +
      (context ? `\n\nContext: ${context}` : ''),
      '1'
    );
    
    switch (choice) {
      case '1':
        window.location.href = `tel:${phoneNumber}`;
        break;
      case '2':
        window.open(`https://voice.google.com/u/0/calls?a=nc,%2B${phoneNumber.replace('+', '')}`, '_blank');
        break;
      case '3':
        this.copyToClipboard(phoneNumber);
        alert(`Phone number ${phoneNumber} copied to clipboard!`);
        break;
      case '4':
        window.open(`skype:${phoneNumber}?call`, '_blank');
        break;
      case '5':
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}`, '_blank');
        break;
    }
  }
  
  // Enhanced messaging service
  static sendMessage(phoneNumber: string, message?: string, platform: 'sms' | 'whatsapp' | 'telegram' = 'sms') {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    switch (platform) {
      case 'sms':
        window.location.href = `sms:${cleanNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${cleanNumber.replace('+', '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/${cleanNumber.replace('+', '')}`, '_blank');
        break;
    }
  }
  
  // Copy to clipboard utility
  private static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }
  
  // Validate phone number format
  static validatePhoneNumber(phoneNumber: string): { valid: boolean; formatted?: string; error?: string } {
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Indian number validation
    const indianRegex = /^\+91[6-9]\d{9}$/;
    if (indianRegex.test(cleaned)) {
      return { 
        valid: true, 
        formatted: cleaned.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3')
      };
    }
    
    // International number validation (basic)
    const intlRegex = /^\+\d{10,15}$/;
    if (intlRegex.test(cleaned)) {
      return { valid: true, formatted: cleaned };
    }
    
    // Emergency numbers
    const emergencyNumbers = ['100', '101', '102', '108', '112', '1091', '1098'];
    if (emergencyNumbers.includes(cleaned)) {
      return { valid: true, formatted: cleaned };
    }
    
    return { 
      valid: false, 
      error: 'Invalid phone number format. Use +91XXXXXXXXXX for Indian numbers or +CCXXXXXXXXXX for international numbers.'
    };
  }
  
  // Enhanced contact verification
  static async verifyContact(phoneNumber: string): Promise<{ verified: boolean; info?: any; error?: string }> {
    try {
      // In production, integrate with contact verification services
      // like Truecaller API, WhatsApp Business API, etc.
      
      const validation = this.validatePhoneNumber(phoneNumber);
      if (!validation.valid) {
        return { verified: false, error: validation.error };
      }
      
      // Simulate contact verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        verified: true,
        info: {
          number: validation.formatted,
          carrier: 'Verified Carrier',
          location: 'India',
          type: 'mobile'
        }
      };
    } catch (error) {
      return { verified: false, error: 'Contact verification failed' };
    }
  }
  
  // Check if device supports calling
  static supportsPhoneCalls(): boolean {
    return 'navigator' in window && (
      navigator.userAgent.includes('Mobile') ||
      navigator.userAgent.includes('Android') ||
      navigator.userAgent.includes('iPhone') ||
      'mediaDevices' in navigator
    );
  }
  
  // Get available contact methods
  static getAvailableMethods(): string[] {
    const methods = ['tel'];
    
    if (navigator.userAgent.includes('Mobile')) {
      methods.push('sms', 'whatsapp');
    }
    
    if (navigator.mediaDevices) {
      methods.push('webrtc');
    }
    
    return methods;
  }
}

// Export convenience functions
export const makeCall = ContactService.makeCall.bind(ContactService);
export const sendMessage = ContactService.sendMessage.bind(ContactService);
export const validatePhone = ContactService.validatePhoneNumber.bind(ContactService);
export const verifyContact = ContactService.verifyContact.bind(ContactService);
