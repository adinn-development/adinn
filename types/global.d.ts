declare global {
    var mongoose: {
        connection: any;
        conn: any;
        promise: Promise<any> | null;
      };
  }
  
  export {};
  