
describe('API Tests', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users/')
        .send({ name: 'Pruthul'}, {email: 'jasmine@yopmail.com'}, {password: 'jasmine'})
        .expect(201)
        .end((err, res) => {
          if (err) return done.fail(err);
          expect(res.message).toEqual('Successfully authenticated the user');
          done();
        });
    });
  
    it('should give an error as using existing email', (done) => {
        request(app)
          .post('/api/users/')
          .send({ name: 'Pruthul'}, {email: 'HelloWorld'}, {password: 'jasmine'})
          .expect(400)
          .end((err, res) => {
            if (err) return done.fail(err);
            expect(res.message).toEqual('User already exists');
            done();
          });
      });
  
      it('reset password', (done) => {
        request(app)
          .post('/api/user/resetPassword')
          send({email: 'jasmine@yopmail.com'})
          .expect(200)
          .end((err, res) => {
            if (err) return done.fail(err);
            expect(res.message).toEqual('Sent the reset password link');
            done();
          });
      });

      it('user does not exist while resetting password', (done) => {
        request(app)
          .post('/api/user/resetPassword')
          send({email: 'jasmine123@yopmail.com'})
          .expect(400)
          .end((err, res) => {
            if (err) return done.fail(err);
            expect(res.message).toEqual('User does not exist');
            done();
          });
      });

      it('link expired while resetting password', (done) => {
        const userId = '654fa1919dcbfe4b8eb277a5'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZmExOTE5ZGNiZmU0YjhlYjI3N2E1In0sImlhdCI6MTY5OTcxNzUyMiwiZXhwIjoxNjk5ODAzOTIyfQ.tTSrdAuE4I-aOODVBfVZ-tiOtz3vt2m5VeJFd7tmfKs'
        request(app)
          .post(`/api/user/resetPassword/${userId}/${token}`)
          send({email: 'jasmine@yopmail.com'})
          .expect(400)
          .end((err, res) => {
            if (err) return done.fail(err);
            expect(res.message).toEqual('invalid link or expired');
            done();
          });
      });

      it('upload image for the user', (done) => {
        const email = 'jasmine@yopmail.com'
        request(app)
          .post(`/api/user/resetPassword/${email}`)
          .attach('image', 'file_example_JPG_100kB.jpeg')
          .expect(200)
          .end((err, res) => {
            if (err) return done.fail(err);
            expect(res.message).toEqual('Image uploaded successfully!');
            done();
          });
      });
  
  });